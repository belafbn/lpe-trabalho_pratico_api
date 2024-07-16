const { getAdotantesDB, addAdotanteDB, deleteAdotanteDB, updateAdotanteDB, getAdotantePorCodigoDB } = require('../usecases/adotanteUseCases');

const getAdotantes = async (request, response) => {
    await getAdotantesDB ()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            staus : 'error',
            message : 'Erro ao consultar as categorias: ' + err
        }));
}
const addAdotantes = async (request, response) => {
    await addAdotanteDB (request.body)
        .then(data => response.status(200).json({
            status : 'sucess', message : 'Adotante criada',
            objeto : data
        }))
        .catch(err => response.status(400).json({
            staus : 'error',
            message : err
        }));
}
const updateAdotantes = async (request, response) => {
    await updateAdotanteDB (request.body)
        .then(data => response.status(200).json({
            status : 'sucess', message : 'Adotante alterada',
            objeto : data
        }))
        .catch(err => response.status(400).json({
            staus : 'error',
            message : err
        }));
}
const deleteAdotantes = async (request, response) => {
    await deleteAdotanteDB(request.params.codigo)
        .then(data => response.status(200).json({
            status : 'sucess', message : data,
        }))
        .catch(err => response.status(400).json({
            staus : 'error',
            message : err
        }));
}
const getAdotantePorCodigo = async (request, response) => {
    await getAdotantePorCodigoDB(request.params.codigo)
        .then(data => response.status(200).json( data))
        .catch(err => response.status(400).json({
            staus : 'error',
            message : err
        }));
}

module.exports = {getAdotantes, addAdotantes, updateAdotantes, deleteAdotantes, getAdotantePorCodigo}