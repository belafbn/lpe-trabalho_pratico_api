const { pool } = require('../config');
const Adotante = require('../entities/adotante');

const getAdotantesDB = async () => {
  try {
    const { rows } = await pool.query(`SELECT * FROM  adotantes ORDER BY nome`);
    return rows;
  } catch (err) {
    throw "Erro: " + err;
  }
}

const addAdotanteDB = async (body) => {
  try {
    const { nome, telefone, email, endereco } = body;
    const results = await pool.query(`INSERT INTO adotantes (nome, telefone, email, endereco) VALUES ($1, $2, $3, $4) RETURNING codigo, nome, telefone, email, endereco`, [nome, telefone, email, endereco]);
    const adotante = results.rows[0];
    return new Adotante(adotante.codigo, adotante.nome, adotante.telefone, adotante.email, adotante.endereco)
  } catch (error) {
    throw "Erro ao inserir: " + error;
  }
}

const updateAdotanteDB = async (body) => {
  try {
    const { codigo, nome, telefone, email, endereco } = body;
    const results = await pool.query(`UPDATE adotantes SET nome = $2, telefone = $3, email = $4, endereco = $5 WHERE codigo = $1 RETURNING codigo, nome `, [codigo, nome, telefone, email, endereco]);
    if (results.rowCount == 0) {
      throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`
    }
    const adotante = results.rows[0];
    return new Adotante(adotante.codigo, adotante.nome, adotante.telefone, adotante.email, adotante.endereco)
  } catch (error) {
    throw "Erro ao alterar: " + error;
  }
}

const deleteAdotanteDB = async (codigo) => {
  try {
    const results = await pool.query(`DELETE FROM adotantes WHERE codigo = $1 `, [codigo]);
    if (results.rowCount == 0) {
      throw `Nenhum registro encontrado com o código ${codigo} para ser removido`
    } else {
      return "Registro removido com sucesso"
    }
  } catch (error) {
    throw "Erro ao remover: " + error;
  }
}
const getAdotantePorCodigoDB = async (codigo) => {
  try {
    const results = await pool.query(`SELECT * FROM adotantes WHERE codigo = $1 `, [codigo]);
    if (results.rowCount == 0) {
      throw `Nenhum registro encontrado com o código ${codigo}`
    } else {
      const adotante = results.rows[0];
      return new Adotante(adotante.codigo, adotante.nome, adotante.telefone, adotante.email, adotante.endereco)
    }
  } catch (error) {
    throw "Erro ao encontrar: " + error;
  }
}

module.exports = { getAdotantesDB, getAdotantePorCodigoDB, deleteAdotanteDB, addAdotanteDB, updateAdotanteDB }