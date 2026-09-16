const express = require('express');
const router = express.Router();

const categorias = [
  { id: 1, nome: 'Informática' },
  { id: 2, nome: 'Escritório' },
  { id: 3, nome: 'Acessórios' }
];

router.get('/', (req, res) => {
  res.render('categorias/index', { categorias });
});

router.get('/cadastro', (req, res) => {
  res.render('categorias/form-cadastro');
});

router.post('/', (req, res) => {
  const { nome } = req.body;
  categorias.push({
    id: categorias.length ? categorias[categorias.length - 1].id + 1 : 1,
    nome
  });
  res.redirect('/categorias');
});

module.exports = router;
