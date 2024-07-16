const { pool } = require('../config');
const Adocao = require('../entities/adocao')

const getAdocoesDB = async () => {
  try {
    const { rows } = await pool.query(`SELECT 
        a.codigo,
        a.animal,
        ad.nome AS adotante,
        ad.telefone,
        ad.email,
        ad.endereco,
        an.nome AS nome_animal,
        an.especie,
        an.genero,
        an.ativo,
        TO_CHAR(a.data_adocao, 'YYYY-MM-DD') AS data_adocao,
        a.observacao
    FROM 
        adocoes a
    JOIN 
        adotantes ad ON a.adotante = ad.codigo
    JOIN 
        animais an ON a.animal = an.codigo

    ORDER BY 
        a.codigo;`);

    return rows
    //return rows.map((adocao) => new Adocao(adocao.adotante.adotante, adocao.adotante.telefone, adocao.adotante.email, 
    //    adocao.adotante.endereco, adocao.animal.adotante,  adocao.animal.data_adocao, adocao.animal.observacao));        
  } catch (err) {
    throw "Erro : " + err;
  }
}

const addAdocaoDB = async (body) => {
  try {
    const { adotante, animal, data_adocao, observacao } = body;
    const results = await pool.query(`INSERT INTO adocoes (adotante, animal, data_adocao, observacao) 
            VALUES ($1, $2, $3, $4)
            returning codigo, adotante, animal,to_char(data_adocao,'YYYY-MM-DD') as data_adocao, observacao`,
      [adotante, animal, data_adocao, observacao]);
    const adocao = results.rows[0];
    return new Adocao("", adocao.adotante, adocao.observacao, adocao.data_adocao, adocao.animal);
  } catch (err) {
    throw "Erro ao inserir o adocao: " + err;
  }
}

const updateAdocaoDB = async (body) => {
  try {
    const { codigo, adotante, animal, data_adocao, observacao } = body;
    const results = await pool.query(`UPDATE adocoes set adotante = $2 , animal = $3, data_adocao = $4, observacao = $5 where codigo = $1 
        returning codigo, adotante, animal, to_char(data_adocao,'YYYY-MM-DD') as data_adocao, observacao`,
      [codigo, adotante, animal, data_adocao, observacao]);
    if (results.rowCount == 0) {
      throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
    }
    const adocao = results.rows[0];
    return new Adocao(adocao.codigo, adocao.adotante, adocao.animal, adocao.genero,
      adocao.ativo, adocao.data_adocao, adocao.observacao, "");
  } catch (err) {
    throw "Erro ao alterar o adocao: " + err;
  }
}

const deleteAdocaoDB = async (codigo) => {
  try {
    const results = await pool.query(`DELETE FROM adocoes where codigo = $1`,
      [codigo]);
    if (results.rowCount == 0) {
      throw `Nenhum registro encontrado com o código ${codigo} para ser removido`;
    } else {
      return "Adocao removido com sucesso";
    }
  } catch (err) {
    throw "Erro ao remover o adocao: " + err;
  }
}

const getAdocaoPorCodigoDB = async (codigo) => {
  try {
    const results = await pool.query(`select p.codigo as codigo, p.adotante as adotante, p.animal as animal, to_char(p.data_adocao,'YYYY-MM-DD') as data_adocao, p.observacao as observacao
        from adocoes p 
        where p.codigo = $1`,
      [codigo]);
    if (results.rowCount == 0) {
      throw "Nenhum registro encontrado com o código: " + codigo;
    } else {
      const adocao = results.rows[0];
      return new Adocao(adocao.codigo, adocao.adotante, adocao.animal, adocao.data_adocao, adocao.observacao, "");
    }
  } catch (err) {
    throw "Erro ao recuperar o adocao: " + err;
  }
}

module.exports = {
  getAdocoesDB, addAdocaoDB, updateAdocaoDB, deleteAdocaoDB, getAdocaoPorCodigoDB
}
