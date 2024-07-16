const { addAdocaoDB, deleteAdocaoDB, getAdocaoPorCodigoDB, getAdocoesDB, updateAdocaoDB } = require('../usecases/adocaoUseCases')

const getAdocoes = async (request, response) => {
  await getAdocoesDB()
    .then(data => response.status(200).json(data))
    .catch(err => response.status(400).json({
      status: 'error',
      message: 'Erro ao consultar os animais: ' + err
    }));
}

const addAdocoes = async (request, response) => {
  await addAdocaoDB(request.body)
    .then(data => response.status(200).json({
      status: "success", message: "Adocoes criado",
      objeto: data
    }))
    .catch(err => response.status(400).json({
      status: 'error',
      message: err
    }));
}

const updateAdocoes = async (request, response) => {
  await updateAdocaoDB(request.body)
    .then(data => response.status(200).json({
      status: "success", message: "Adocoes alterado",
      objeto: data
    }))
    .catch(err => response.status(400).json({
      status: 'error',
      message: err
    }));
}

const deleteAdocoes = async (request, response) => {
  await deleteAdocaoDB(parseInt(request.params.codigo))
    .then(data => response.status(200).json({
      status: "success", message: data
    }))
    .catch(err => response.status(400).json({
      status: 'error',
      message: err
    }));
}

const getAdocoesPorCodigo = async (request, response) => {
  await getAdocaoPorCodigoDB(parseInt(request.params.codigo))
    .then(data => response.status(200).json(data))
    .catch(err => response.status(400).json({
      status: 'error',
      message: err
    }));
}

module.exports = {
  getAdocoes, addAdocoes, updateAdocoes, deleteAdocoes, getAdocoesPorCodigo
}