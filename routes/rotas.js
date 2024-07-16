const { Router } = require('express');

const { rotasAdotantes } = require('./rotasAdotantes');
const { rotasAnimais } = require('./rotasAnimais');
const { rotasAdocoes } = require('./rotasAdocoes');
const {login} = require ('../controllers/segurancaController');

const rotas = new Router();

rotas.route("/login").post(login);

rotas.use(rotasAdotantes);
rotas.use(rotasAnimais);
rotas.use(rotasAdocoes);

module.exports = rotas