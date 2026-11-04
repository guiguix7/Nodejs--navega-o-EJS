---
name: Node EJS project conventions
description: "Use when editing Node.js, Express, EJS, routes, storage, tests, or frontend files in this project."
applyTo: ["app.js", "data/**/*.js", "routes/**/*.js", "test/**/*.js", "public/**/*.js", "views/**/*.ejs"]
---

# Convencoes locais

- Use CommonJS (`require` e `module.exports`) e sintaxe suportada pelo Node.js 20.
- Prefira `async`/`await` e trate erros com o middleware existente do Express.
- Mantenha regras de entidade em `routes/entityConfig.js` e comportamento CRUD compartilhado em `routes/crudFactory.js`.
- Use os helpers de `data/store.js`; nao acesse diretamente o arquivo JSON nas rotas.
- Escape dados renderizados por EJS por padrao. Use `<%-` somente para HTML confiavel e intencionalmente renderizado.
- Para formularios, valide campos obrigatorios e tipos no servidor e devolva status HTTP coerente.
- Para mudancas de comportamento, adicione um caso em `test/app.test.js` ou explique por que um teste existente cobre a mudanca.
- Evite dependencias novas quando a plataforma Node ou as dependencias atuais resolvem o problema.
- Preserve o idioma e o tom em portugues nas mensagens visiveis ao usuario.
