# Orientacoes para agentes de IA

## Contexto do projeto

- Aplicacao CommonJS em Node.js 20+, Express 4 e EJS 3.
- Interface administrativa com Bootstrap 5.3, Bootstrap Icons, CSS e JavaScript do navegador.
- Entidades CRUD: categorias, clientes, fornecedores e produtos.
- Persistencia local em `data/cadastros.json` ou Supabase REST quando as variaveis de ambiente estao configuradas.
- Testes usam o Node.js Test Runner e ficam em `test/`.

## Regras de trabalho

- Leia `README.md` e o codigo local relevante antes de propor mudancas.
- Preserve as rotas publicas existentes e a estrutura CommonJS; nao migre para TypeScript, ESM ou outro framework sem solicitacao.
- Prefira os padroes existentes em `routes/crudFactory.js`, `routes/entityConfig.js` e `data/store.js` antes de criar novas abstracoes.
- Mantenha a validacao no servidor. Dados vindos de formularios sao entrada nao confiavel.
- Nao exponha `SUPABASE_SERVICE_ROLE_KEY`, arquivos `.env` ou dados reais em codigo, testes, logs, HTML ou documentacao.
- Nao trate o armazenamento JSON como persistencia adequada para producao serverless.
- Mudancas em rotas, armazenamento, validacao ou templates devem incluir ou atualizar testes focados.
- Preserve acessibilidade basica nos templates: labels associados, mensagens compreensiveis, foco visivel e botoes com acao clara.
- Mantenha o escopo pequeno; nao reescreva arquivos nao relacionados.

## Verificacao obrigatoria

Depois de alterar o codigo, execute:

```bash
npm test
```

Quando a mudanca afetar a inicializacao ou a interface, verifique tambem:

```bash
npm start
```

Use `Ctrl+C` para encerrar o servidor iniciado localmente. Registre no resumo quais verificacoes foram executadas e quais nao foram possiveis.

## Comandos uteis

- `npm install`: instala dependencias.
- `npm test`: executa os testes automatizados.
- `npm run dev`: inicia o servidor com Nodemon.
- `npm start`: inicia o servidor sem recarga automatica.
