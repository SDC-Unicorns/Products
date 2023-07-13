require('dotenv').config();

const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const pool = require('./db');

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

const PORT = process.env.PORT || 3000;

//ROUTES//


app.listen(PORT, () => {
  console.log(`server has started on port ${PORT}`)
});