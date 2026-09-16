const express = require('express');
const router = express.Router();

const produtos = [
  { id: 1, nome: 'Notebook', descricao: 'Notebook para uso profissional', preco: 3500, estoque: 10, categoria: 'Informática' },
  { id: 2, nome: 'Caderno', descricao: 'Caderno premium para escritório', preco: 45, estoque: 30, categoria: 'Escritório' }
];

router.get('/', (req, res) => {
  res.render('produtos/index', { produtos });
});

router.get('/cadastro', (req, res) => {
  res.render('produtos/form-cadastro');
});

router.post('/', (req, res) => {
  const { nome, descricao, preco, estoque, categoria } = req.body;
  produtos.push({
    id: produtos.length ? produtos[produtos.length - 1].id + 1 : 1,
    nome,
    descricao,
    preco: Number(preco),
    estoque: Number(estoque),
    categoria
  });
  res.redirect('/produtos');
});

module.exports = router;
