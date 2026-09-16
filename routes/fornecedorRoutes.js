const express = require('express');
const router = express.Router();

const fornecedores = [
  { id: 1, razaoSocial: 'Tech Supply LTDA', cnpj: '12.345.678/0001-99', email: 'contato@techsupply.com', telefone: '(31) 3333-4444', cidade: 'Belo Horizonte' },
  { id: 2, razaoSocial: 'Mercado Norte', cnpj: '98.765.432/0001-88', email: 'atendimento@mercadonorte.com', telefone: '(47) 3222-5566', cidade: 'Florianópolis' }
];

router.get('/', (req, res) => {
  res.render('fornecedores/index', { fornecedores });
});

router.get('/cadastro', (req, res) => {
  res.render('fornecedores/form-cadastro');
});

router.post('/', (req, res) => {
  const { razaoSocial, cnpj, email, telefone, cidade } = req.body;
  fornecedores.push({
    id: fornecedores.length ? fornecedores[fornecedores.length - 1].id + 1 : 1,
    razaoSocial,
    cnpj,
    email,
    telefone,
    cidade
  });
  res.redirect('/fornecedores');
});

module.exports = router;
