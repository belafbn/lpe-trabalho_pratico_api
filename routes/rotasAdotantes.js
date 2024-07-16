const { Router } = require('express');

const { verificaJWT } = require('../controllers/segurancaController');


const { getAdotantes, addAdotantes, updateAdotantes, deleteAdotantes, getAdotantePorCodigo } = require('../controllers/adotantesController')

const rotasAdotantes = new Router();

rotasAdotantes.route('/adotantes')
  .get(verificaJWT, getAdotantes)
  .post(verificaJWT, addAdotantes)
  .put(verificaJWT, updateAdotantes)
rotasAdotantes.route('/adotantes/:codigo')
  .get(verificaJWT, getAdotantePorCodigo)
  .delete(verificaJWT, deleteAdotantes)

module.exports = { rotasAdotantes };