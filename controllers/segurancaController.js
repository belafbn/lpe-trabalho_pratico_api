const { autenticaUsuarioDB } = require('../usecases/segurancaUseCases')
require("dotenv-safe").config();
const jwt = require('jsonwebtoken');

const login = async (request, response) => {
  await autenticaUsuarioDB(request.body)
    .then(usuario => {
      console.log(usuario)
      const token = jwt.sign({ usuario }, process.env.SECRET, { expiresIn: 1000 * 60 })
      return response.json({ auth: true, token: token })
    })
    .catch(err => response.status(401).json({ auth: false, message: err }));

}

function verificaJWT(request, response, next) {
  const token = request.headers['authorization'];
  if (!token) return response.status(401).json({ auth: false, message: "Nenhum token recebido" });

  jwt.verify(token, process.env.SECRET, function (err, decoded) {
    if (err) {
      return response.status(401).json({ auth: false, message: "Erro ao decodificar o token " + err });
    }
    //adicionando o objeto usuario extraído no token para ser usado na próxima requisição
    request.usuario = decoded.usuario;
    next();
  })
}
module.exports = { login, verificaJWT }