const { Router } = require('express');

const {verificaJWT} = require('../controllers/segurancaController');


const {getAdocoes, addAdocoes, updateAdocoes, deleteAdocoes, getAdocoesPorCodigo} = require ('../controllers/adocoesController')


const rotasAdocoes = new Router();

rotasAdocoes.route('/adocao')
    .get(verificaJWT,getAdocoes)
    .post (verificaJWT,addAdocoes)
    .put (verificaJWT,updateAdocoes)
rotasAdocoes.route('/adocao/:codigo')
    .get(verificaJWT, getAdocoesPorCodigo)
    .delete (verificaJWT, deleteAdocoes)

module.exports = {rotasAdocoes};