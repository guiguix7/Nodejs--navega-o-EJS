const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');

process.env.DATA_FILE = path.join(os.tmpdir(), `sistema-cadastro-test-${process.pid}.json`);
delete process.env.SUPABASE_URL;
delete process.env.SUPABASE_SERVICE_ROLE_KEY;

const app = require('../app');
const store = require('../data/store');
const entities = require('../routes/entityConfig');

const examples = {
  categorias: { nome: 'Categoria de teste' },
  clientes: { nome: 'Cliente de teste', email: 'teste@example.com', telefone: '(11) 99999-0000', cidade: 'Guarulhos' },
  fornecedores: { razaoSocial: 'Fornecedor de teste', cnpj: '12.345.678/0001-99', email: 'empresa@example.com', telefone: '(11) 3333-0000', cidade: 'Guarulhos - SP' },
  produtos: { nome: 'Produto de teste', descricao: 'Descrição do produto de teste', preco: '19.90', estoque: '4', categoria: 'Acessórios' }
};

function body(values) {
  return new URLSearchParams(values).toString();
}

test('página inicial e CRUD completo das quatro entidades', async (t) => {
  const server = app.listen(0, '127.0.0.1');
  await new Promise((resolve) => server.once('listening', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;

  t.after(async () => {
    await new Promise((resolve) => server.close(resolve));
    await fs.rm(process.env.DATA_FILE, { force: true });
  });

  const home = await fetch(base);
  assert.equal(home.status, 200);
  assert.match(await home.text(), /Sistema de Cadastro|Organize seus cadastros/);

  for (const [key, config] of Object.entries(entities)) {
    const validValues = examples[key];

    const formPage = await fetch(`${base}${config.path}/cadastro`);
    assert.equal(formPage.status, 200, `${key}: formulário de cadastro deveria abrir`);

    const createResponse = await fetch(`${base}${config.path}`, {
      method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: body(validValues), redirect: 'manual'
    });
    assert.equal(createResponse.status, 302, `${key}: cadastro deveria redirecionar`);
    assert.match(createResponse.headers.get('location'), new RegExp(`^${config.path}\\?sucesso=`));

    let records = await store.list(config.store);
    const created = records.find((record) => record[Object.keys(validValues)[0]] === validValues[Object.keys(validValues)[0]]);
    assert.ok(created, `${key}: registro deveria existir após cadastro`);

    const listResponse = await fetch(`${base}${config.path}?q=${encodeURIComponent(String(validValues[Object.keys(validValues)[0]]))}`);
    assert.equal(listResponse.status, 200, `${key}: listagem com pesquisa deveria abrir`);
    assert.match(await listResponse.text(), /Editar/);

    const editPage = await fetch(`${base}${config.path}/${created.id}/editar`);
    assert.equal(editPage.status, 200, `${key}: formulário de edição deveria abrir`);

    const updatedValues = { ...validValues };
    const firstField = Object.keys(validValues)[0];
    updatedValues[firstField] = `${validValues[firstField]} atualizado`;
    const updateResponse = await fetch(`${base}${config.path}/${created.id}/editar`, {
      method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: body(updatedValues), redirect: 'manual'
    });
    assert.equal(updateResponse.status, 302, `${key}: edição deveria redirecionar`);
    const updated = await store.get(config.store, created.id);
    assert.equal(updated[firstField], updatedValues[firstField], `${key}: valor deveria ser atualizado`);

    const deleteResponse = await fetch(`${base}${config.path}/${created.id}/excluir`, {
      method: 'POST', redirect: 'manual'
    });
    assert.equal(deleteResponse.status, 302, `${key}: exclusão deveria redirecionar`);
    assert.equal(await store.get(config.store, created.id), null, `${key}: registro deveria ser excluído`);

    const missingEdit = await fetch(`${base}${config.path}/999999/editar`);
    assert.equal(missingEdit.status, 404, `${key}: ID inexistente deveria responder 404`);
    const missingDelete = await fetch(`${base}${config.path}/999999/excluir`, { method: 'POST' });
    assert.equal(missingDelete.status, 404, `${key}: exclusão de ID inexistente deveria responder 404`);
  }
});

test('validação impede cadastro com campos obrigatórios vazios', async (t) => {
  const server = app.listen(0, '127.0.0.1');
  await new Promise((resolve) => server.once('listening', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  t.after(() => new Promise((resolve) => server.close(resolve)));

  const response = await fetch(`${base}/clientes`, {
    method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: body({ nome: '', email: '', telefone: '', cidade: '' })
  });
  assert.equal(response.status, 422);
  assert.match(await response.text(), /Preencha o campo/);
});
