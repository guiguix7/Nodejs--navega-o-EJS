const express = require('express');
const router = express.Router();

const clientes = [
  { id: 1, nome: 'Ana Souza', email: 'ana@email.com', telefone: '(11) 99999-1111', cidade: 'São Paulo' },
  { id: 2, nome: 'Bruno Lima', email: 'bruno@email.com', telefone: '(21) 98888-2222', cidade: 'Rio de Janeiro' }
];

router.get('/', (req, res) => {
  res.render('clientes/index', { clientes });
});

router.get('/cadastro', (req, res) => {
  res.render('clientes/form-cadastro');
});

router.post('/', (req, res) => {
  const { nome, email, telefone, cidade } = req.body;
  clientes.push({
    id: clientes.length ? clientes[clientes.length - 1].id + 1 : 1,
    nome,
    email,
    telefone,
    cidade
  });
  res.redirect('/clientes');
});

module.exports = router;
