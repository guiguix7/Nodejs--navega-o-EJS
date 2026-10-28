# Prompt completo utilizado para orientar a IA

Você é um desenvolvedor full-stack experiente, especializado em Node.js, Express, EJS, Bootstrap, design de interfaces e experiência do usuário (UX/UI).

Quero que você analise, corrija, desenvolva e reestilize um projeto que já existe. **Não crie outro projeto do zero. Trabalhe sobre o código atual, preserve as funcionalidades que já funcionam e implemente as melhorias necessárias.**

## 1. Informações do projeto

**Repositório GitHub:** https://github.com/guiguix7/Nodejs--navega-o-EJS  
**Aplicação publicada:** https://nodejs-navega-o-ejs.vercel.app/  
**Tecnologias atuais:** Node.js, Express, EJS e Bootstrap.  
**Contexto:** trabalho escolar de desenvolvimento web da turma 2DS, com o objetivo de finalizar todas as operações CRUD e reestilizar a aplicação com o auxílio de Inteligência Artificial.

## 2. Objetivo principal

Transformar o atual Sistema de Cadastro em uma aplicação web mais moderna, profissional, organizada, intuitiva e responsiva, mantendo sua finalidade original.

Você deverá executar duas tarefas principais:

1. Finalizar e corrigir as funcionalidades CRUD.
2. Fazer um redesign completo da interface, melhorando a estrutura, a organização, a navegação e a experiência do usuário.

**Importante:** mudar somente as cores não é suficiente. Quero uma mudança visual perceptível, com melhoria na disposição dos elementos, nos formulários, nas tabelas, nos botões, na navegação e na apresentação geral do sistema.

## 3. Etapa 1 — Análise do projeto existente

Antes de modificar o código, examine os arquivos do repositório, incluindo `app.js`, `package.json`, arquivos dentro de `routes`, arquivos dentro de `views`, arquivos EJS de cadastro, edição e listagem, componentes compartilhados como a navegação, arquivos CSS, JavaScript e imagens existentes, configurações utilizadas na publicação pela Vercel e `readme.md` ou `README.md`.

Identifique quais funcionalidades já existem, quais apresentam problemas, quais estão incompletas e quais arquivos precisarão ser modificados ou criados.

Não se limite a apresentar uma análise: depois de identificar os problemas, implemente as soluções.

## 4. Etapa 2 — Finalização do CRUD

Garanta que todas as quatro operações CRUD funcionem corretamente para **Categorias, Clientes, Fornecedores e Produtos**.

### Create — Cadastrar
- Permitir o cadastro de novos registros.
- Criar formulários organizados, com campos identificados.
- Validar campos obrigatórios.
- Validar formatos e tipos de dados quando necessário.
- Mostrar mensagens claras de sucesso ou de erro.

### Read — Listar
- Exibir os registros cadastrados em tabelas organizadas.
- Mostrar corretamente todos os dados relevantes de cada entidade.
- Apresentar uma mensagem amigável quando não houver registros.
- Organizar as colunas e os controles de cada tabela.
- Disponibilizar pesquisa ou filtro quando for viável.

### Update — Editar
- Criar ou corrigir as telas de edição.
- Preencher os formulários com os dados atuais do registro.
- Permitir alterar os campos e salvar as modificações.
- Atualizar o registro correto sem duplicá-lo.
- Retornar à listagem após a atualização.
- Informar quando o registro não existir.

### Delete — Excluir
- Criar ou corrigir a exclusão de registros.
- Pedir confirmação antes de excluir.
- Excluir somente o registro selecionado.
- Atualizar a listagem depois da exclusão.
- Mostrar mensagens adequadas de sucesso ou erro.

Verifique especialmente se **Categorias também possui edição e exclusão completas**, além de cadastro e listagem.

Mantenha as rotas coerentes com a estrutura atual do projeto e evite quebrar os caminhos que já são utilizados pela aplicação.

## 5. Etapa 3 — Redesign completo da interface

Desenvolva uma identidade visual moderna para o sistema, inspirada em painéis administrativos profissionais.

### Direção visual
Utilize uma interface limpa, organizada e consistente, com fundo claro e discreto; cores principais sóbrias, como azul-marinho, branco e azul; uma cor de destaque consistente; tipografia legível; espaçamento adequado; cantos arredondados com moderação; sombras sutis; ícones apropriados; hierarquia visual clara; e bom contraste entre textos e fundos.

Você pode utilizar Bootstrap e CSS personalizado. Evite instalar bibliotecas desnecessárias ou trocar toda a tecnologia existente.

### Página inicial
Transforme a página inicial em um painel administrativo com cabeçalho moderno, nome do sistema, apresentação breve da finalidade da aplicação, cartões ou blocos visuais para Categorias, Clientes, Fornecedores e Produtos, ícones para cada módulo, botões claros para acessar cada área, indicadores com quantidades reais de registros caso possam ser obtidos corretamente, e identificação da equipe e da turma em uma área discreta. Não utilize números fictícios para simular estatísticas.

### Navegação
Crie uma navegação consistente entre as páginas, com links para os quatro módulos. A navegação deve funcionar em telas pequenas e grandes. Pode utilizar uma barra superior ou uma barra lateral responsiva, desde que seja compatível com o projeto atual.

### Telas de listagem
Reestilize todas as telas de listagem: título e descrição da seção; botão de cadastro em destaque; tabelas com cabeçalhos claros; linhas bem espaçadas; botões de editar e excluir visualmente distintos; estados vazios com orientação; pesquisa por texto quando aplicável; tabelas adaptadas a dispositivos móveis. Em telas pequenas, evite que a tabela ultrapasse descontroladamente os limites da página.

### Formulários de cadastro e edição
Padronize os formulários com títulos que indiquem a ação atual; rótulos claros; campos com largura e espaçamento adequados; validações e mensagens de erro compreensíveis; botões de salvar e cancelar; organização lógica dos campos; e indicação visual de obrigatoriedade. Mantenha os campos e dados próprios de cada entidade.

### Experiência do usuário
Implemente feedback visual após operações, confirmação de exclusão, botões com estados de interação, mensagens para formulários inválidos, navegação intuitiva, foco visível nos elementos interativos e consistência entre as páginas. O resultado deve parecer um único sistema.

## 6. Etapa 4 — Qualidade e compatibilidade técnica

Preserve Node.js, Express e EJS; reaproveite Bootstrap; evite duplicação; crie componentes EJS compartilhados quando útil; mantenha nomes de arquivos e rotas coerentes; trate IDs inválidos e registros inexistentes; evite erros de sintaxe; utilize interpolação escapada do EJS para dados fornecidos pelo usuário; não remova funcionalidades sem justificativa; não invente funcionalidades; e não simule operações bem-sucedidas.

Analise como os dados são armazenados. Caso o sistema utilize arrays em memória, avalie as consequências na Vercel. Se for necessária persistência para o deploy, apresente a alternativa simples, explique as configurações e não invente credenciais. Não afirme que os dados ficam armazenados permanentemente se isso não estiver implementado.

Garanta compatibilidade com execução local e hospedagem.

## 7. Etapa 5 — Testes obrigatórios

Depois de implementar, teste todas as entidades. Critérios: página inicial abre; navegação funciona; categorias podem ser cadastradas, listadas, editadas e excluídas; clientes, fornecedores e produtos têm CRUD completo; alterações aparecem nas listagens; campos obrigatórios são validados; registros inexistentes são tratados; confirmação de exclusão funciona; layout funciona em computadores e celulares; não existem erros de sintaxe; projeto inicia localmente; e configuração de publicação foi revisada.

Execute testes automatizados, se houver, e faça verificações manuais possíveis. Não marque como concluído algo que não foi testado.

## 8. Etapa 6 — Atualização obrigatória do README

Atualize o README para incluir: nome do projeto “Sistema de Cadastro — CRUD Node.js”; integrantes existentes; objetivo; tecnologias realmente utilizadas; CRUD disponível para cada entidade; prompt completo utilizado; uso da IA; alterações sugeridas pela IA; alterações implementadas pelo grupo; seção preparada para capturas reais da conversa; captura antes da reestilização; captura depois da reestilização; link da aplicação https://nodejs-navega-o-ejs.vercel.app/; link do repositório https://github.com/guiguix7/Nodejs--navega-o-EJS.

As evidências podem ficar em `docs/evidencias`. Não invente capturas, conversas ou alterações manuais. Deixe indicações claras dos arquivos e imagens que precisam ser preenchidos. Explique separadamente o que foi recomendado pela IA, o que foi aplicado ao código e o que foi ajustado manualmente pelos integrantes.

## 9. Etapa 7 — Preparação para publicação

Verifique a preparação para a Vercel; preserve a URL atual quando possível; confira rotas, estáticos, dependências e inicialização; documente variáveis de ambiente; corrija problemas que impeçam o CRUD; e informe os passos para republicar. Não afirme que publicou, atualizou o GitHub ou executou testes reais sem realizar essas ações.

## 10. Formato da entrega

Apresente resumo dos problemas; arquivos criados ou modificados; CRUD corrigido/implementado; melhorias visuais; relação entre sugestões e alterações; testes e limitações; README atualizado; passos de execução local; passos de publicação; e pendências manuais.

Quando tiver acesso ao ambiente, modifique os arquivos diretamente e apresente o conteúdo completo quando necessário. Não entregue somente exemplos isolados ou pseudocódigo.

**Critério final de sucesso:** manter as funcionalidades existentes, oferecer CRUD completo para Categorias, Clientes, Fornecedores e Produtos, apresentar redesign perceptível, funcionar no ambiente de execução e possuir README com informações e evidências exigidas.

Comece analisando o repositório atual e prossiga com a implementação, sem interromper o trabalho após o diagnóstico.
