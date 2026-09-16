const express = require('express');
const router = express.Router();

const produtos = [
  { id: 1, nome: 'Relogio', descricao: 'Relógio pra ver as horas', preco: 3500, estoque: 10, categoria: 'Horario' },
  { id: 2, nome: 'Fone de ouvido', descricao: 'Fone de ouvido para ouvir musicas', preco: 245, estoque: 30, categoria: 'Acessórios' }
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
