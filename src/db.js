// import pgPromise from 'pg-promise';
require('dotenv').config();
const dotenv = require('dotenv');
const pgPromise = require('pg-promise');

const pgp = pgPromise({});
const pool = pgp(process.env.DATABASE_URL);

// export pool;

// const Pool = require('pg').Pool;

// const pool = new Pool({
//   user: process.env.USER,
//   password: process.env.PASSWORD,
//   host: process.env.HOST,
//   port: process.env.DBPORT,
//   database: process.env.DB
// });


module.exports = pool;