# MASTER PROMPT — MIGRAÇÃO DO CRUD PARA ARQUIVOS JSON

## 1. MISSÃO PRINCIPAL

Você é um desenvolvedor especialista em Node.js, Express, JavaScript, EJS e armazenamento de dados com arquivos JSON. Analise e modifique o projeto existente para cumprir a atividade escolar **Migração para JSON com apoio de IA**. Trabalhe diretamente no repositório, sem criar outro projeto, preservando estrutura, funcionalidades, interface e tecnologias.

Repositório: https://github.com/guiguix7/Nodejs--navega-o-EJS  
Aplicação atual: https://nodejs-navega-o-ejs.vercel.app/

## 2. CONTEXTO

O projeto utiliza Node.js, Express, EJS, Bootstrap, JavaScript, CSS e Node.js Test Runner. Possui quatro entidades: Categorias, Clientes, Fornecedores e Produtos. A estrutura inclui `app.js`, `data/store.js`, `routes/crudFactory.js`, `routes/entityConfig.js`, rotas individuais, templates em `views/`, arquivos em `public/` e testes em `test/app.test.js`.

O CRUD, formulários, listagens, edição, exclusão, validações, pesquisa e navegação já existem. Preserve-os. Não faça redesign desnecessário.

## 3. OBJETIVO E ESTRUTURA

Migre o armazenamento para um arquivo JSON independente por entidade. A estrutura obrigatória é:

```text
data/
├── store.js
├── categorias.json
├── clientes.json
├── fornecedores.json
└── produtos.json
```

Cada arquivo contém exclusivamente um array de registros da entidade correspondente. Exemplo:

```json
[
  { "id": 1, "nome": "Informática" },
  { "id": 2, "nome": "Escritório" }
]
```

Use os campos já existentes no projeto. Não invente entidades ou propriedades.

## 4. ETAPA 1 — DIAGNÓSTICO

Antes de editar, examine integralmente `data/store.js`, os arrays de dados iniciais, o uso do armazenamento em `crudFactory.js`, as configurações das quatro entidades, as rotas, os testes, o README e a configuração de deploy. Identifique o modelo atual e os arquivos que precisam mudar. O projeto já possui CRUD compartilhado: reutilize essa arquitetura. Após o diagnóstico, implemente; não encerre apenas com uma análise.

## 5. ETAPA 2 — ARQUIVOS JSON

Crie `data/categorias.json`, `data/clientes.json`, `data/fornecedores.json` e `data/produtos.json`. Transfira os registros iniciais existentes para os arquivos adequados, preservando seus dados e IDs. Remova listas fixas de registros de controllers, rotas e módulos JavaScript. `store.js` pode conter configurações e funções, mas não arrays de registros predefinidos.

Se um arquivo não existir, crie-o com `[]`, sem sobrescrever conteúdo já existente. Se houver um antigo `data/cadastros.json` com dados, avalie uma migração segura para os arquivos individuais, sem perda, duplicação ou sobrescrita inadvertida.

## 6. ETAPA 3 — CRUD DIRETAMENTE NOS ARQUIVOS

Implemente funções reutilizáveis em `data/store.js`, usando preferencialmente `fs/promises`, `path`, `JSON.parse` e `JSON.stringify`.

**Create:** ler o arquivo da entidade, interpretar o JSON, gerar ID único/sequencial, adicionar o registro, gravar o arquivo e retornar o registro criado.

**Read:** ler o arquivo correspondente em cada consulta, interpretar o JSON e retornar os registros atuais. O arquivo deve ser a fonte de verdade, não um cache em memória.

**Update:** ler o arquivo, localizar pelo ID, atualizar apenas o registro selecionado, preservar o ID, gravar e retornar o registro atualizado. Não duplicar registros.

**Delete:** ler o arquivo, localizar e remover somente o registro selecionado, gravar o array atualizado e informar corretamente se encontrou/excluiu o registro.

Requisitos técnicos:
- Cada entidade usa exclusivamente seu próprio arquivo.
- Não use arrays em memória como fonte de verdade.
- Serialize gravações concorrentes por entidade para evitar perda de atualizações.
- Quando viável, grave em arquivo temporário e substitua atomicamente o arquivo original.
- Não transforme JSON inválido silenciosamente em array vazio.
- Trate arquivo inexistente, erros de leitura e erros de gravação.
- Preserve tipos numéricos de preço e estoque e os IDs existentes.
- O armazenamento JSON deve ser a única fonte de dados do CRUD desta atividade.
- Remova/desative o Supabase do fluxo de CRUD desta atividade. Não use banco, API externa ou arrays para contornar a exigência.

## 7. ETAPA 4 — PRESERVAÇÃO DO SISTEMA

Mantenha CRUD completo para Categorias, Clientes, Fornecedores e Produtos. Preserve campos, formulários, validações, mensagens, pesquisa, confirmação de exclusão, tratamento de IDs inválidos e registros inexistentes, indicadores reais da página inicial, navegação e responsividade. Não altere a identidade visual sem necessidade. A atividade é uma migração de armazenamento, não uma reconstrução.

## 8. ETAPA 5 — TESTES COMPLETOS

Atualize e execute os testes para as quatro entidades. Verifique:
- leitura dos dados de cada JSON;
- cadastro gravando no arquivo correto;
- persistência após reiniciar o servidor;
- edição do registro correto, preservando ID;
- exclusão apenas do registro selecionado;
- integridade dos demais registros;
- arquivos ausentes e JSON inválido;
- IDs inválidos e registros inexistentes;
- validação dos campos e tipos numéricos;
- erros de leitura/gravação;
- operações concorrentes.

Atualize `test/app.test.js` para usar diretório temporário isolado, sem alterar os JSON reais. Execute de verdade:

```bash
npm ci
npm test
```

Execute também verificações de sintaxe e inicialização. Informe resultados e limitações reais. Nunca declare testes aprovados sem executá-los.

## 9. ETAPA 6 — README OBRIGATÓRIO

Atualize o README com estas seções:
1. Nome do projeto: Sistema de Cadastro — CRUD Node.js.
2. Integrantes: Guilherme Andraz e Pedro Ailton; turma 2DS.
3. Objetivo: migração do CRUD para arquivos JSON individuais.
4. Estrutura de pastas atualizada.
5. Entidades utilizadas e respectivos campos.
6. Prompt utilizado: transcrição integral deste MASTER PROMPT, sem resumir.
7. Uso da Inteligência Artificial.
8. Resposta da IA: síntese fiel da resposta realmente recebida, sem inventar conversas.
9. Sugestões recebidas: separar as aproveitadas, adaptadas e não utilizadas, justificando.
10. Alterações realizadas: arquivos e mudanças reais.
11. Desafios encontrados e soluções reais.
12. Ajustes manuais: deixar `[PREENCHER PELOS INTEGRANTES]` quando não houver informação; não inventar.
13. Link do repositório: https://github.com/guiguix7/Nodejs--navega-o-EJS
14. Link e situação real da aplicação: https://nodejs-navega-o-ejs.vercel.app/
15. Conclusão sobre o aprendizado da migração.
16. Evidências: reservar espaços para prints reais da conversa com a IA, pasta `data/`, JSONs e cadastro, edição e exclusão funcionando.

Salve também a transcrição integral em `docs/prompt-migracao-json.md` e referencie-a no README. Não invente prints, respostas, alterações manuais ou resultados.

## 10. ETAPA 7 — PUBLICAÇÃO E PERSISTÊNCIA

Analise a hospedagem atual. A Vercel Functions não oferece persistência durável garantida para gravações locais: o filesystem pode ser efêmero e compartilhamento entre instâncias não é garantido. Não apresente gravação temporária como persistência permanente. Não volte ao Supabase nem substitua JSON por banco. Se a persistência online for necessária, explique a limitação e recomende um servidor Node.js com disco persistente (por exemplo, serviço compatível com Persistent Disk no Render), verificando os custos e requisitos atuais antes de afirmar detalhes. Preserve a URL atual quando tecnicamente possível. Não altere serviços externos sem acesso e autorização.

## 11. REGRAS DE EXECUÇÃO

1. Trabalhe no repositório existente.
2. Analise antes de modificar.
3. Implemente diretamente nos arquivos.
4. Não entregue somente exemplos ou pseudocódigo.
5. Não troque tecnologias sem necessidade.
6. Não invente nem remova funcionalidades sem justificativa.
7. Não simule operações CRUD.
8. Não mantenha arrays fixos como fonte de verdade.
9. Não use banco de dados como substituto dos JSON.
10. Não invente testes, capturas ou resultados.
11. Atualize testes e documentação.
12. Preserve alterações preexistentes.

## 12. ENTREGA FINAL E CRITÉRIO DE SUCESSO

Apresente resumo da análise; armazenamento anterior; processo de migração; arquivos JSON criados; arquivos modificados; funcionamento do CRUD; sugestões da IA aproveitadas; ajustes manuais pendentes; resultado real dos testes; situação do deploy; README atualizado; limitações.

O projeto só está concluído quando todas as operações de cadastrar, listar, editar e excluir usam diretamente `data/categorias.json`, `data/clientes.json`, `data/fornecedores.json` e `data/produtos.json`, o CRUD continua funcional e o README documenta a atividade e o uso da IA com informações verdadeiras.

Comece analisando o repositório e prossiga com a implementação completa. Não interrompa o trabalho após o diagnóstico.
