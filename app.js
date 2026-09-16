const express = require('express');
const path = require('path');

const categoriaRoutes = require('./routes/categoriaRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const fornecedorRoutes = require('./routes/fornecedorRoutes');
const produtoRoutes = require('./routes/produtoRoutes');

const app = express();
const preferredPort = Number(process.env.PORT) || 3005;
const portsToTry = [preferredPort, 3000, 3001, 3002, 3003, 4000, 8080];

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index');
});

app.use('/categorias', categoriaRoutes);
app.use('/clientes', clienteRoutes);
app.use('/fornecedores', fornecedorRoutes);
app.use('/produtos', produtoRoutes);

function startServer(index = 0) {
  const port = portsToTry[index];

  const server = app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });

  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      const nextPort = portsToTry[index + 1];

      if (nextPort) {
        console.log(`Porta ${port} em uso. Tentando ${nextPort}...`);
        startServer(index + 1);
        return;
      }

      console.error('Nenhuma porta disponível. Feche processos antigos ou defina a variável PORT.');
      process.exit(1);
    }

    throw error;
  });
}

startServer();
