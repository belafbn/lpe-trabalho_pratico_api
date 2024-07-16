const { pool } = require('../config');
const Animal = require('../entities/animal')

const getAnimaisDB = async () => {
  try {
    const { rows } = await pool.query(`SELECT 
        a.codigo AS codigo,
        a.nome AS nome,
        a.especie AS especie,
        a.genero AS genero,
        a.idade AS idade,
        a.ativo AS ativo,
        TO_CHAR(a.data_cadastro, 'YYYY-MM-DD') AS data_cadastro,
        a.idade AS idade 
        FROM animais a ORDER BY  a.codigo;`);
    return rows
  } catch (err) {
    throw "Erro : " + err;
  }
}

const addAnimalDB = async (body) => {
  try {
    const { nome, especie, genero, ativo, data_cadastro, idade } = body;
    const results = await pool.query(`INSERT INTO animais (nome, especie, genero, ativo, data_cadastro, idade) 
            VALUES ($1, $2, $3, $4, $5, $6)
            returning codigo, nome, especie, genero, ativo, to_char(data_cadastro,'YYYY-MM-DD') as data_cadastro, idade`,
      [nome, especie, genero, ativo, data_cadastro, idade]);
    const animal = results.rows[0];
    return new Animal(animal.codigo, animal.nome, animal.especie, animal.genero,
      animal.ativo, animal.data_cadastro, animal.idade, "");
  } catch (err) {
    throw "Erro ao inserir o animal: " + err;
  }
}

const updateAnimalDB = async (body) => {
  try {
    const { codigo, nome, especie, genero, ativo, data_cadastro, idade } = body;
    const results = await pool.query(`UPDATE animais set nome = $2 , especie = $3, genero = $4, 
        ativo = $5, data_cadastro = $6, idade = $7 where codigo = $1 
        returning codigo, nome, especie, genero, ativo, to_char(data_cadastro,'YYYY-MM-DD') as data_cadastro, idade`,
      [codigo, nome, especie, genero, ativo, data_cadastro, idade]);
    if (results.rowCount == 0) {
      throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
    }
    const animal = results.rows[0];
    return new Animal(animal.codigo, animal.nome, animal.especie, animal.genero,
      animal.ativo, animal.data_cadastro, animal.idade, "");
  } catch (err) {
    throw "Erro ao alterar o animal: " + err;
  }
}

const deleteAnimalDB = async (codigo) => {
  try {
    const results = await pool.query(`DELETE FROM animais where codigo = $1`,
      [codigo]);
    if (results.rowCount == 0) {
      throw `Nenhum registro encontrado com o código ${codigo} para ser removido`;
    } else {
      return "Animal removido com sucesso";
    }
  } catch (err) {
    throw "Erro ao remover o animal: " + err;
  }
}

const getAnimalPorCodigoDB = async (codigo) => {
  try {
    const results = await pool.query(`select p.codigo as codigo, p.nome as nome, p.especie as especie, p.genero as genero, 
        p.ativo as ativo, to_char(p.data_cadastro,'YYYY-MM-DD') as data_cadastro, p.idade as idade
        from animais p 
        where p.codigo = $1`,
      [codigo]);
    if (results.rowCount == 0) {
      throw "Nenhum registro encontrado com o código: " + codigo;
    } else {
      const animal = results.rows[0];
      return new Animal(animal.codigo, animal.nome, animal.especie, animal.genero,
        animal.ativo, animal.data_cadastro, animal.idade, "");
    }
  } catch (err) {
    throw "Erro ao recuperar o animal: " + err;
  }
}

module.exports = {
  getAnimaisDB, addAnimalDB, updateAnimalDB, deleteAnimalDB, getAnimalPorCodigoDB
}
