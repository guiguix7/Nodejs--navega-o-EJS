const express = require('express');
const router = express.Router();

const fornecedores = [
  { id: 1, razaoSocial: 'Amazon', cnpj: '6767676767', email: 'saboraidentro@email.com', telefone: '67 67676767', cidade: 'Rua Belterra 291 Santo Amaro Sp' },
  { id: 2, razaoSocial: 'Mercado Preso', cnpj: '6767676767', email: 'emeailtuff@email.com', telefone: '67 676767', cidade: 'Rua Zé Pilintra 6742' }
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
