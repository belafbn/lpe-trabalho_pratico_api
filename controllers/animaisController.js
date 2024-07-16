const { getAnimaisDB, addAnimalDB, updateAnimalDB, deleteAnimalDB, getAnimalPorCodigoDB } = require('../usecases/animalUseCases')

const getAnimais = async (request, response) => {
    await getAnimaisDB()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao consultar os produtos: ' + err
        }));
}

const addAnimal = async (request, response) => {
    await addAnimalDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Animal criado",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const updateAnimal = async (request, response) => {
    await updateAnimalDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Animal alterado",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const deleteAnimal = async (request, response) => {
    await deleteAnimalDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json({
            status: "success", message: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));        
}

const getAnimalPorCodigo= async (request, response) => {
    await getAnimalPorCodigoDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));           
}

module.exports = {
   getAnimais, addAnimal, updateAnimal, deleteAnimal, getAnimalPorCodigo
}