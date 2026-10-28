const makeCrudRouter = require('./crudFactory');
const entities = require('./entityConfig');

module.exports = makeCrudRouter(entities.fornecedores);
