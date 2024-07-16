const { pool } = require('../config');
const Usuario = require('../entities/usuario');

const autenticaUsuarioDB = async (body) => {
  try {
    const { email, senha } = body;
    const results = await pool.query(`SELECT * FROM  usuarios WHERE email = $1 AND senha = $2`, [email, senha]);
    if (results.rowCount == 0) {
      throw "Usuário ou senha inválidos"
    }
    return results.rows[0];
  } catch (err) {
    throw "erro ao autenticar o usuário: " + err;
  }
}
module.exports = { autenticaUsuarioDB }