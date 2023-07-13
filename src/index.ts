// import pgPromise from 'pg-promise';
import dotenv from 'dotenv';

dotenv.config();

// const pgp = pgPromise({});
// // const db = pgp(process.env.DATABASE_URL);

// // export db;

const Pool = require('pg').Pool;

const pool = new Pool({
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.DBPASSWORD,
  database: process.env.DB
});


module.exports = pool