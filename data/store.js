const fs = require('fs/promises');
const os = require('os');
const path = require('path');

const definitions = {
  categorias: {
    table: 'sc_categorias', fields: { nome: 'nome' }
  },
  clientes: {
    table: 'sc_clientes', fields: { nome: 'nome', email: 'email', telefone: 'telefone', cidade: 'cidade' }
  },
  fornecedores: {
    table: 'sc_fornecedores', fields: { razaoSocial: 'razao_social', cnpj: 'cnpj', email: 'email', telefone: 'telefone', cidade: 'cidade' }
  },
  produtos: {
    table: 'sc_produtos', fields: { nome: 'nome', descricao: 'descricao', preco: 'preco', estoque: 'estoque', categoria: 'categoria' }
  }
};

const seeds = {
  categorias: [
    { id: 1, nome: 'Informática' },
    { id: 2, nome: 'Escritório' },
    { id: 3, nome: 'Acessórios' }
  ],
  clientes: [
    { id: 1, nome: 'Ana Souza', email: 'ana@email.com', telefone: '(11) 99999-1111', cidade: 'São Paulo' },
    { id: 2, nome: 'Bruno Lima', email: 'bruno@email.com', telefone: '(21) 98888-2222', cidade: 'Rio de Janeiro' }
  ],
  fornecedores: [
    { id: 1, razaoSocial: 'Amazon', cnpj: '6767676767', email: 'saboraidentro@email.com', telefone: '67 67676767', cidade: 'Rua Belterra 291 Santo Amaro Sp' },
    { id: 2, razaoSocial: 'Mercado Preso', cnpj: '6767676767', email: 'emeailtuff@email.com', telefone: '67 676767', cidade: 'Rua Zé Pilintra 6742' }
  ],
  produtos: [
    { id: 1, nome: 'Relogio', descricao: 'Relógio pra ver as horas', preco: 3500, estoque: 10, categoria: 'Horario' },
    { id: 2, nome: 'Fone de ouvido', descricao: 'Fone de ouvido para ouvir musicas', preco: 245, estoque: 30, categoria: 'Acessórios' }
  ]
};

const hasSupabaseUrl = Boolean(process.env.SUPABASE_URL);
const hasSupabaseKey = Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);
const useRemoteDatabase = hasSupabaseUrl && hasSupabaseKey;
const remoteConfigIncomplete = hasSupabaseUrl !== hasSupabaseKey;
const supabaseUrl = String(process.env.SUPABASE_URL || '').replace(/\/$/, '');
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const storageFile = process.env.DATA_FILE || (process.env.VERCEL
  ? path.join(os.tmpdir(), 'sistema-cadastro-dados.json')
  : path.join(__dirname, 'cadastros.json'));
let initPromise;
let fileData;
let writeQueue = Promise.resolve();

async function remoteRequest(key, options = {}) {
  const response = await fetch(`${supabaseUrl}/rest/v1/${definitions[key].table}${options.query || ''}`, {
    method: options.method || 'GET',
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation'
    },
    body: options.body === undefined ? undefined : JSON.stringify(options.body)
  });
  const responseText = await response.text();
  let data = [];
  if (responseText) {
    try { data = JSON.parse(responseText); }
    catch { throw new Error(`Resposta inesperada do banco remoto (HTTP ${response.status}).`); }
  }
  if (!response.ok) {
    const detail = data && typeof data === 'object' ? (data.message || data.details || data.hint) : '';
    throw new Error(`Falha no banco remoto (HTTP ${response.status})${detail ? `: ${detail}` : ''}`);
  }
  return data;
}

function fromRemote(row, key) {
  const result = { id: Number(row.id) };
  for (const [property, column] of Object.entries(definitions[key].fields)) {
    let value = row[column];
    if (property === 'preco') value = Number(value);
    result[property] = value;
  }
  return result;
}

function toRemote(values, key) {
  const payload = {};
  for (const [property, column] of Object.entries(definitions[key].fields)) payload[column] = values[property];
  return payload;
}

async function initialize() {
  if (remoteConfigIncomplete) {
    throw new Error('Configure SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY juntos, ou remova ambos para usar o armazenamento local.');
  }
  if (useRemoteDatabase) {
    for (const key of Object.keys(definitions)) {
      await remoteRequest(key, { query: '?select=id&limit=1' });
    }
    return;
  }

  try {
    const content = await fs.readFile(storageFile, 'utf8');
    fileData = JSON.parse(content);
    for (const key of Object.keys(definitions)) {
      if (!Array.isArray(fileData[key])) fileData[key] = [];
    }
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
    fileData = JSON.parse(JSON.stringify(seeds));
    await persistFile();
  }
}

async function ensureInitialized() {
  if (!initPromise) {
    initPromise = initialize().catch((error) => {
      initPromise = null;
      throw error;
    });
  }
  return initPromise;
}

function persistFile() {
  writeQueue = writeQueue.catch(() => {}).then(async () => {
    await fs.mkdir(path.dirname(storageFile), { recursive: true });
    await fs.writeFile(storageFile, JSON.stringify(fileData, null, 2), 'utf8');
  });
  return writeQueue;
}


async function list(key) {
  await ensureInitialized();
  if (useRemoteDatabase) {
    const rows = await remoteRequest(key, { query: '?select=*&order=id.asc' });
    return rows.map((row) => fromRemote(row, key));
  }
  return fileData[key].map((item) => ({ ...item }));
}

async function get(key, id) {
  await ensureInitialized();
  if (useRemoteDatabase) {
    const rows = await remoteRequest(key, { query: `?select=*&id=eq.${id}&limit=1` });
    return rows.length ? fromRemote(rows[0], key) : null;
  }
  const item = fileData[key].find((record) => record.id === id);
  return item ? { ...item } : null;
}

async function create(key, values) {
  await ensureInitialized();
  if (useRemoteDatabase) {
    const rows = await remoteRequest(key, { method: 'POST', body: toRemote(values, key) });
    if (!rows.length) throw new Error('O banco remoto não retornou o registro criado.');
    return fromRemote(rows[0], key);
  }
  const nextId = fileData[key].reduce((max, item) => Math.max(max, item.id), 0) + 1;
  const record = { id: nextId, ...values };
  fileData[key].push(record);
  await persistFile();
  return { ...record };
}

async function update(key, id, values) {
  await ensureInitialized();
  if (useRemoteDatabase) {
    const rows = await remoteRequest(key, { method: 'PATCH', query: `?id=eq.${id}`, body: toRemote(values, key) });
    return rows.length ? fromRemote(rows[0], key) : null;
  }
  const index = fileData[key].findIndex((record) => record.id === id);
  if (index === -1) return null;
  fileData[key][index] = { id, ...values };
  await persistFile();
  return { ...fileData[key][index] };
}

async function remove(key, id) {
  await ensureInitialized();
  if (useRemoteDatabase) {
    const rows = await remoteRequest(key, { method: 'DELETE', query: `?id=eq.${id}&select=id` });
    return rows.length > 0;
  }
  const index = fileData[key].findIndex((record) => record.id === id);
  if (index === -1) return false;
  fileData[key].splice(index, 1);
  await persistFile();
  return true;
}

async function counts() {
  const keys = Object.keys(definitions);
  const values = await Promise.all(keys.map(async (key) => [key, (await list(key)).length]));
  return Object.fromEntries(values);
}

module.exports = { list, get, create, update, remove, counts, usesDatabase: useRemoteDatabase };
