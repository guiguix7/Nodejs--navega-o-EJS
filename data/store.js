const fs = require('node:fs/promises');
const path = require('node:path');

const definitions = {
  categorias: 'categorias.json',
  clientes: 'clientes.json',
  fornecedores: 'fornecedores.json',
  produtos: 'produtos.json'
};

// DATA_DIR permite isolar os testes sem tocar nos arquivos reais.
const dataDirectory = path.resolve(process.env.DATA_DIR || __dirname);
const queues = new Map();

function fileFor(key) {
  if (!Object.hasOwn(definitions, key)) throw new Error(`Entidade de armazenamento inválida: ${key}`);
  return path.join(dataDirectory, definitions[key]);
}

async function readRecords(key) {
  const file = fileFor(key);
  try {
    const content = await fs.readFile(file, 'utf8');
    const records = JSON.parse(content);
    if (!Array.isArray(records)) throw new Error(`O arquivo ${path.basename(file)} deve conter um array JSON.`);
    return records;
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.mkdir(dataDirectory, { recursive: true });
      // Migra dados do antigo cadastros.json apenas quando o arquivo individual não existe.
      // O legado nunca é apagado nem substitui arquivos individuais já existentes.
      const legacyFile = path.join(dataDirectory, 'cadastros.json');
      let initial = [];
      try {
        const legacy = JSON.parse(await fs.readFile(legacyFile, 'utf8'));
        if (legacy && Array.isArray(legacy[key])) initial = legacy[key];
      } catch (legacyError) {
        if (legacyError.code !== 'ENOENT' && !(legacyError instanceof SyntaxError)) throw legacyError;
        if (legacyError instanceof SyntaxError) throw new Error(`JSON legado inválido em cadastros.json: ${legacyError.message}`);
      }
      try { await fs.writeFile(file, `${JSON.stringify(initial, null, 2)}\n`, { flag: 'wx' }); }
      catch (writeError) { if (writeError.code !== 'EEXIST') throw writeError; }
      return readRecords(key);
    }
    if (error instanceof SyntaxError) throw new Error(`JSON inválido em ${path.basename(file)}: ${error.message}`);
    throw error;
  }
}

async function writeRecords(key, records) {
  const file = fileFor(key);
  await fs.mkdir(dataDirectory, { recursive: true });
  const temporary = `${file}.${process.pid}.${Date.now()}.tmp`;
  try {
    await fs.writeFile(temporary, `${JSON.stringify(records, null, 2)}\n`, { encoding: 'utf8', flag: 'wx' });
    await fs.rename(temporary, file);
  } catch (error) {
    await fs.rm(temporary, { force: true }).catch(() => {});
    throw error;
  }
}

function serialize(key, operation) {
  const previous = queues.get(key) || Promise.resolve();
  const current = previous.catch(() => {}).then(operation);
  queues.set(key, current);
  return current.finally(() => { if (queues.get(key) === current) queues.delete(key); });
}

async function list(key) {
  await (queues.get(key) || Promise.resolve()).catch(() => {});
  return (await readRecords(key)).map((record) => ({ ...record }));
}

async function get(key, id) {
  const records = await list(key);
  const record = records.find((item) => Number(item.id) === Number(id));
  return record ? { ...record } : null;
}

async function create(key, values) {
  return serialize(key, async () => {
    const records = await readRecords(key);
    const nextId = records.reduce((max, record) => Math.max(max, Number(record.id) || 0), 0) + 1;
    const record = { id: nextId, ...values };
    records.push(record);
    await writeRecords(key, records);
    return { ...record };
  });
}

async function update(key, id, values) {
  return serialize(key, async () => {
    const records = await readRecords(key);
    const index = records.findIndex((record) => Number(record.id) === Number(id));
    if (index < 0) return null;
    records[index] = { ...records[index], ...values, id: records[index].id };
    await writeRecords(key, records);
    return { ...records[index] };
  });
}

async function remove(key, id) {
  return serialize(key, async () => {
    const records = await readRecords(key);
    const index = records.findIndex((record) => Number(record.id) === Number(id));
    if (index < 0) return false;
    records.splice(index, 1);
    await writeRecords(key, records);
    return true;
  });
}

async function counts() {
  const entries = await Promise.all(Object.keys(definitions).map(async (key) => [key, (await list(key)).length]));
  return Object.fromEntries(entries);
}

module.exports = { list, get, create, update, remove, counts, dataDirectory, usesDatabase: false };
