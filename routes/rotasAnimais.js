const { Router } = require('express');

const { verificaJWT } = require('../controllers/segurancaController');

const { getAnimais, addAnimal, updateAnimal, deleteAnimal, getAnimalPorCodigo } = require('../controllers/animaisController');

const rotasAnimais = new Router();

rotasAnimais.route('/animais')
  .get(verificaJWT, getAnimais)
  .post(verificaJWT, addAnimal)
  .put(verificaJWT, updateAnimal)

rotasAnimais.route('/animais/:codigo')
  .get(verificaJWT, getAnimalPorCodigo)
  .delete(verificaJWT, deleteAnimal)

module.exports = { rotasAnimais };

