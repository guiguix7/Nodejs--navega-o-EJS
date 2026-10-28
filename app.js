const express = require('express');
const path = require('path');
const store = require('./data/store');

const categoriaRoutes = require('./routes/categoriaRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const fornecedorRoutes = require('./routes/fornecedorRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const entities = require('./routes/entityConfig');

const app = express();
app.disable('x-powered-by');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: false, limit: '30kb' }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res, next) => {
  try {
    res.render('index', {
      counts: await store.counts(),
      entities: Object.values(entities)
    });
  } catch (error) {
    next(error);
  }
});

app.use('/categorias', categoriaRoutes);
app.use('/clientes', clienteRoutes);
app.use('/fornecedores', fornecedorRoutes);
app.use('/produtos', produtoRoutes);

app.use((req, res) => {
  res.status(404).render('errors/404', { message: 'A página que você tentou acessar não existe.' });
});

app.use((error, req, res, next) => {
  if (res.headersSent) return next(error);
  console.error('Erro na aplicação:', error.message);
  res.status(500).render('errors/500', {
    message: process.env.NODE_ENV === 'production'
      ? 'Não foi possível concluir a operação. Tente novamente.'
      : error.message
  });
});

if (require.main === module) {
  const preferredPort = Number(process.env.PORT) || 3005;
  const portsToTry = [...new Set([preferredPort, 3000, 3001, 3002, 3003, 4000, 8080])];
  const startServer = (index = 0) => {
    const port = portsToTry[index];
    const server = app.listen(port, () => {
      console.log(`Sistema de Cadastro disponível em http://localhost:${port}`);
    });
    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE' && portsToTry[index + 1]) {
        console.log(`Porta ${port} em uso. Tentando ${portsToTry[index + 1]}...`);
        startServer(index + 1);
        return;
      }
      if (error.code === 'EADDRINUSE') {
        console.error('Nenhuma porta disponível. Feche processos antigos ou defina a variável PORT.');
        process.exitCode = 1;
        return;
      }
      throw error;
    });
  };
  startServer();
}

module.exports = app;
