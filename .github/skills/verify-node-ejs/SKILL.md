---
name: verify-node-ejs
description: "Use when validating, testing, or diagnosing changes in this Node.js Express EJS CRUD project. Covers dependency checks, automated tests, server smoke checks, and safe test data."
argument-hint: "Describe the change or behavior to verify"
user-invocable: true
---

# Validar o projeto Node EJS

## Procedimento

1. Confirme que `package.json` e `package-lock.json` estao presentes.
2. Instale dependencias com `npm install` apenas quando `node_modules` nao existir.
3. Execute `npm test`.
4. Para mudancas de inicializacao ou interface, execute `npm start` e faca uma verificacao HTTP local em `http://localhost:3005` ou na porta informada pelo processo.
5. Encerre o servidor ao finalizar a verificacao.
6. Relate o comando, resultado e qualquer limitacao ambiental.

## Regras de seguranca

- Nunca preencha ou imprima segredos de Supabase.
- Use o armazenamento JSON temporario dos testes; nao altere `data/cadastros.json` manualmente para simular sucesso.
- Nao use dados pessoais reais.
- Nao considere a inicializacao do servidor uma prova de que todas as rotas CRUD funcionam; `npm test` continua sendo obrigatorio.

## Criterio de sucesso

A validacao so esta completa quando os testes automatizados passam e, se aplicavel, a rota inicial responde sem erro. Falhas devem ser reportadas com a primeira causa observavel, sem mascarar o erro com tentativas destrutivas.