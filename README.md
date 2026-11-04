# Sistema de Cadastro — CRUD Node.js

Aplicação acadêmica de cadastro de Categorias, Clientes, Fornecedores e Produtos, desenvolvida com Node.js, Express, EJS, Bootstrap, JavaScript e arquivos JSON.

## 1. Integrantes
- Guilherme Andraz
- Pedro Ailton
- **Turma:** 2DS

## 2. Objetivo
A atividade migra o armazenamento do CRUD para quatro arquivos JSON independentes. Cada entidade lê e grava seus próprios registros em `data/`, sem banco de dados externo ou arrays em memória como fonte de verdade.

## 3. Tecnologias
- Node.js 20 ou superior
- Express 4
- EJS 3
- Bootstrap 5.3 e Bootstrap Icons
- JavaScript e CSS
- `node:fs/promises` e `node:test`

## 4. Estrutura de pastas
```text
├── app.js
├── data/
│   ├── store.js
│   ├── categorias.json
│   ├── clientes.json
│   ├── fornecedores.json
│   └── produtos.json
├── routes/
│   ├── crudFactory.js
│   ├── entityConfig.js
│   ├── categoriaRoutes.js
│   ├── clienteRoutes.js
│   ├── fornecedorRoutes.js
│   └── produtoRoutes.js
├── views/
├── public/
├── test/app.test.js
├── docs/
│   ├── prompt-utilizado.md
│   ├── prompt-migracao-json.md
│   └── evidencias/
└── package.json
```

## 5. Entidades e campos
| Arquivo | Campos armazenados |
|---|---|
| `categorias.json` | `id`, `nome` |
| `clientes.json` | `id`, `nome`, `email`, `telefone`, `cidade` |
| `fornecedores.json` | `id`, `razaoSocial`, `cnpj`, `email`, `telefone`, `cidade` |
| `produtos.json` | `id`, `nome`, `descricao`, `preco`, `estoque`, `categoria` |

Todas as entidades oferecem cadastro, listagem, edição e exclusão. As rotas são compartilhadas por `crudFactory.js`; os campos e rótulos continuam centralizados em `entityConfig.js`.

## 6. Como executar localmente
```bash
npm ci
npm run dev
```
Acesse `http://localhost:3005`. Para iniciar sem Nodemon, use `npm start`. Os arquivos JSON padrão ficam em `data/`.

Para apontar o armazenamento a outro diretório (útil em testes), defina `DATA_DIR`. O diretório deve ser gravável pelo processo Node.js.

## 7. Como o armazenamento funciona
`data/store.js` seleciona o arquivo pelo nome da entidade e implementa `list`, `get`, `create`, `update`, `remove` e `counts`. As gravações de cada entidade são serializadas, escritas em arquivo temporário e finalizadas por renomeação. O ID é sequencial por arquivo. JSON inválido gera erro explícito; não é convertido silenciosamente em lista vazia. Se um arquivo individual estiver ausente, ele é criado sem substituir outro arquivo já existente.

Se `cadastros.json` legado existir no diretório de dados e o JSON individual ainda não existir, a primeira leitura daquela entidade tenta importar seu array correspondente. O arquivo legado não é apagado. Arquivos individuais já existentes têm prioridade e nunca são sobrescritos pela migração.

## 8. Prompt utilizado
O prompt anterior, que orientou a finalização do CRUD e o redesign, está documentado integralmente em [`docs/prompt-utilizado.md`](docs/prompt-utilizado.md).

O prompt completo da migração está transcrito em [`docs/prompt-migracao-json.md`](docs/prompt-migracao-json.md). Esse arquivo contém a instrução integral usada para orientar a análise, implementação, testes e documentação desta atividade.

## 9. Uso da Inteligência Artificial
A IA foi orientada a examinar a arquitetura existente antes de alterar o armazenamento, manter o CRUD compartilhado, transferir os registros de demonstração, criar arquivos separados, testar as operações e documentar as limitações da hospedagem. A implementação foi feita sobre o projeto recebido em ZIP, sem criar outra aplicação.

## 10. Resposta da IA — síntese da implementação
A análise encontrou arrays de demonstração e um armazenamento único `cadastros.json` dentro de `data/store.js`, além de um caminho alternativo Supabase e uma configuração `/tmp` na Vercel. A solução implementada substituiu esse mecanismo por arquivos JSON individuais, leitura e gravação com `fs/promises`, serialização de alterações por entidade, gravação atômica, preservação do ID na edição e tratamento explícito de JSON inválido. Os testes foram adaptados para usar `DATA_DIR` temporário.

**Limite desta síntese:** ela descreve as alterações efetivamente feitas no pacote; não é uma transcrição literal de toda a conversa com a IA.

## 11. Sugestões recebidas e situação
| Sugestão | Situação | Observação |
|---|---|---|
| Preservar a arquitetura compartilhada do CRUD | Aproveitada | `crudFactory.js` e as rotas foram mantidos. |
| Separar os dados por entidade | Aproveitada | Quatro arquivos JSON foram criados. |
| Usar `fs/promises` e gravação segura | Aproveitada | Escrita temporária seguida de `rename`. |
| Serializar gravações simultâneas | Aproveitada | Fila independente por entidade no processo Node. |
| Não substituir JSON inválido por `[]` | Aproveitada | Erro explícito ao ler conteúdo inválido. |
| Remover Supabase do fluxo da atividade | Aproveitada | Sem integração remota no `store.js`. |
| Utilizar Vercel como armazenamento durável em arquivos | Não utilizada | A plataforma não garante persistência durável dos arquivos gravados por Functions. |

## 12. Alterações realizadas
- **Criados:** `data/categorias.json`, `data/clientes.json`, `data/fornecedores.json`, `data/produtos.json`.
- **Modificados:** `data/store.js`, `test/app.test.js`, `.env.example`, `.gitignore`, `README.md`.
- **Preservados:** `app.js`, rotas, configurações das entidades, páginas EJS, CSS e JavaScript da interface.
- **Removido do fluxo:** seleção do Supabase e armazenamento agregado em memória/arquivo único.
- **Migração legada:** se existir `cadastros.json`, seus arrays são importados somente para arquivos individuais ausentes; o legado não é removido.

## 13. Desafios encontrados
1. **Persistência e concorrência:** múltiplas operações poderiam calcular o mesmo próximo ID ou sobrescrever gravações. Foi adicionada uma fila por entidade e gravação por arquivo temporário.
2. **Integridade:** JSON malformado não pode virar silenciosamente `[]`. A leitura agora informa o arquivo inválido.
3. **Hospedagem:** o sistema de arquivos de uma Vercel Function é majoritariamente somente leitura, com `/tmp` temporário; isso não atende à persistência durável exigida.
4. **Isolamento dos testes:** o teste de persistência após reinicialização inicialmente reutilizava o JSON inválido criado pelo teste anterior. A suíte foi corrigida para limpar e recriar o diretório temporário antes desse cenário. A execução seguinte passou integralmente.

## 14. Ajustes feitos manualmente pelos integrantes
[PREENCHER PELOS INTEGRANTES — registrar somente ajustes realmente realizados manualmente, com arquivo e descrição.]

## 15. Publicação e hospedagem
- **Aplicação informada:** https://nodejs-navega-o-ejs.vercel.app/
- **Repositório:** https://github.com/guiguix7/Nodejs--navega-o-EJS
- **Situação verificada em 04/11/2026:** a URL respondeu à consulta externa e apresentou a página inicial do Sistema de Cadastro. Isso confirma que a página publicada está acessível, mas não comprova que ela contém esta migração, nem que o CRUD gravado em JSON persiste. O código deste ZIP foi atualizado localmente; não foi realizado deploy, push para GitHub nem alteração de configuração externa.

A Vercel documenta que Functions têm sistema de arquivos somente leitura e espaço gravável `/tmp` de até 500 MB; esse espaço é temporário. Além disso, instâncias podem ser reutilizadas ou escaladas separadamente, portanto não se deve tratar um JSON gravado localmente como armazenamento permanente e compartilhado. Consulte [Vercel — Runtimes](https://vercel.com/docs/functions/runtimes) e [Vercel — uso de arquivos em Serverless Functions](https://vercel.com/kb/guide/how-can-i-use-files-in-serverless-functions).

**Alternativa compatível com a exigência:** hospedar o Node.js em um serviço/VM com disco persistente gravável. Uma opção documentada é um Render Web Service pago com Persistent Disk; configurar o ponto de montagem, por exemplo `/var/data`, e a variável `DATA_DIR=/var/data`. O Render preserva apenas o que for gravado dentro do ponto de montagem e o disco fica ligado a uma única instância, portanto não se deve escalar horizontalmente esse serviço com esse disco. Antes de migrar, fazer backup e confirmar permissões. Não foi configurada uma hospedagem alternativa nesta atividade. Consulte [Render — Persistent Disks](https://render.com/docs/disks).

Para republicar na Vercel, o projeto pode ser importado/conectado ao GitHub e implantado, mas o CRUD com arquivos graváveis não terá persistência durável ali. A URL pode ser preservada pelo projeto Vercel existente, desde que a equipe tenha acesso e publique uma nova versão; isso não foi feito aqui.

## 16. Evidências
Adicionar capturas reais em `docs/evidencias/`:
- [PREENCHER] `conversa-ia.png` — print da conversa utilizada na atividade.
- [PREENCHER] `estrutura-data.png` — pasta `data/` com os quatro JSON.
- [PREENCHER] `conteudo-json.png` — conteúdo real dos arquivos.
- [PREENCHER] `cadastro-funcionando.png` — cadastro concluído.
- [PREENCHER] `edicao-funcionando.png` — edição concluída.
- [PREENCHER] `exclusao-funcionando.png` — exclusão concluída.

As imagens existentes `antes-listagem-clientes.png` e `antes-pagina-inicial.png` foram preservadas. Não foram fabricadas novas capturas.

## 17. Testes e validação
Executar após instalar as dependências:
```bash
npm ci
npm test
node --check app.js
node --check data/store.js
node --check routes/crudFactory.js
```
Os testes automatizados cobrem o fluxo HTTP CRUD das quatro entidades, validação de obrigatórios, arquivos separados, operações simultâneas, preservação dos tipos numéricos, ID na edição, exclusão, JSON inválido e persistência dos registros após reiniciar o servidor. Foi adicionado o workflow `.github/workflows/testes-crud-json.yml` para executar `npm ci`, `npm test` e verificações de sintaxe em pushes e pull requests. **Resultado verificado em 04/11/2026 pelo GitHub Actions:** `npm ci` concluído; `npm test` aprovado com **5 testes, 5 aprovados e 0 falhas**; as três verificações `node --check` também concluíram com sucesso. Execução: [Testes do CRUD JSON — execução aprovada](https://github.com/guiguix7/Nodejs--navega-o-EJS/actions/runs/41884292744). O `npm ci` reportou 7 vulnerabilidades nas dependências (6 moderadas e 1 alta); elas não impediram os testes, mas devem ser avaliadas separadamente com `npm audit` antes de uma publicação de produção.

## 18. Conclusão
A migração demonstra como persistir dados estruturados em arquivos JSON separados por entidade, mantendo as operações CRUD reutilizáveis. Também evidencia que arquivos locais são simples para projetos pequenos e atividades acadêmicas, mas exigem cuidados com concorrência, integridade e ambiente de hospedagem. Em produção, o volume precisa ser persistente e compartilhado para que as alterações não sejam perdidas.
