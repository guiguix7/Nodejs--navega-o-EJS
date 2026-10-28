const entities = {
  categorias: {
    key: 'categorias', path: '/categorias', title: 'Categorias', singular: 'categoria', plural: 'categorias',
    description: 'Organize os produtos por tipo e mantenha o catálogo padronizado.',
    icon: 'bi-tags', store: 'categorias',
    fields: [
      { name: 'nome', label: 'Nome da categoria', type: 'text', required: true, placeholder: 'Ex.: Informática', maxLength: 80 }
    ],
    columns: [{ key: 'id', label: 'ID', compact: true }, { key: 'nome', label: 'Nome da categoria' }]
  },
  clientes: {
    key: 'clientes', path: '/clientes', title: 'Clientes', singular: 'cliente', plural: 'clientes',
    description: 'Consulte e mantenha atualizados os dados de contato dos clientes.',
    icon: 'bi-people', store: 'clientes',
    fields: [
      { name: 'nome', label: 'Nome completo', type: 'text', required: true, placeholder: 'Nome do cliente', maxLength: 120 },
      { name: 'email', label: 'E-mail', type: 'email', required: true, placeholder: 'nome@exemplo.com', maxLength: 160 },
      { name: 'telefone', label: 'Telefone', type: 'tel', required: true, placeholder: '(11) 99999-9999', maxLength: 30 },
      { name: 'cidade', label: 'Cidade', type: 'text', required: true, placeholder: 'Cidade / UF', maxLength: 100 }
    ],
    columns: [
      { key: 'id', label: 'ID', compact: true }, { key: 'nome', label: 'Nome' },
      { key: 'email', label: 'E-mail' }, { key: 'telefone', label: 'Telefone' }, { key: 'cidade', label: 'Cidade' }
    ]
  },
  fornecedores: {
    key: 'fornecedores', path: '/fornecedores', title: 'Fornecedores', singular: 'fornecedor', plural: 'fornecedores',
    description: 'Centralize os dados de contato e identificação dos fornecedores.',
    icon: 'bi-truck', store: 'fornecedores',
    fields: [
      { name: 'razaoSocial', label: 'Razão social', type: 'text', required: true, placeholder: 'Nome da empresa', maxLength: 160 },
      { name: 'cnpj', label: 'CNPJ', type: 'text', required: true, placeholder: '00.000.000/0000-00', maxLength: 24 },
      { name: 'email', label: 'E-mail', type: 'email', required: true, placeholder: 'contato@empresa.com', maxLength: 160 },
      { name: 'telefone', label: 'Telefone', type: 'tel', required: true, placeholder: '(11) 3333-4444', maxLength: 30 },
      { name: 'cidade', label: 'Cidade / endereço', type: 'text', required: true, placeholder: 'Cidade ou endereço comercial', maxLength: 180 }
    ],
    columns: [
      { key: 'id', label: 'ID', compact: true }, { key: 'razaoSocial', label: 'Razão social' },
      { key: 'cnpj', label: 'CNPJ' }, { key: 'email', label: 'E-mail' },
      { key: 'telefone', label: 'Telefone' }, { key: 'cidade', label: 'Cidade / endereço' }
    ]
  },
  produtos: {
    key: 'produtos', path: '/produtos', title: 'Produtos', singular: 'produto', plural: 'produtos',
    description: 'Gerencie os dados, preços e quantidades dos produtos cadastrados.',
    icon: 'bi-box-seam', store: 'produtos',
    fields: [
      { name: 'nome', label: 'Nome do produto', type: 'text', required: true, placeholder: 'Nome do produto', maxLength: 140 },
      { name: 'categoria', label: 'Categoria', type: 'text', required: true, placeholder: 'Ex.: Acessórios', maxLength: 80 },
      { name: 'descricao', label: 'Descrição', type: 'textarea', required: true, placeholder: 'Descreva o produto', maxLength: 1000, fullWidth: true },
      { name: 'preco', label: 'Preço (R$)', type: 'number', required: true, min: 0, step: '0.01', placeholder: '0,00' },
      { name: 'estoque', label: 'Quantidade em estoque', type: 'number', required: true, min: 0, step: '1', placeholder: '0' }
    ],
    columns: [
      { key: 'id', label: 'ID', compact: true }, { key: 'nome', label: 'Produto' }, { key: 'descricao', label: 'Descrição' },
      { key: 'preco', label: 'Preço', format: 'currency' }, { key: 'estoque', label: 'Estoque' }, { key: 'categoria', label: 'Categoria' }
    ]
  }
};

module.exports = entities;
