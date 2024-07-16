require('dotenv').config()
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})
// else{
//     pool = new Pool({
//         user : 'postgres',
//         host : 'localhost',
//         database : 'trab_lpe',
//         password : 'postgres',
//         port : 5432
//     })
// }

module.exports = { pool }