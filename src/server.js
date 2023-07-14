require('dotenv').config();
//IMPORTS//
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const pool = require('./db.js');

//MIDDLEWARE//
const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
// app.use(express.static(path.join(__dirname, "../src/index.ts")));

//PORT//
const PORT = process.env.PORT || 3000;

//ROUTES//

//get products
app.get('/products', async(req, res) => {
  try {
    const allProducts = await pool.query('SELECT * FROM product');
    res.status(200).send(allProducts);
  } catch (error) {
    console.log("error in product server request: ", error);
    res.status(400).send(error);
  }
});

/*

//get product and features
app.get('/products/:product_id', async(req, res) => {
  try {

  } catch (error) {
    console.log("error in productS server request: ", error);
  }
});

//get reviews
app.get('/reviews/meta', async(req, res) => {
  try {

  } catch (error) {
    console.log("error in reviews server request: ", error);
  }
});

//get styles and skus and photos
app.get('/products/:product_id/styles', async(req, res) => {
  try {

  } catch (error) {
    console.log("error in styles/skus/photos server request: ", error);
  }
});

//get related
app.get('/products/:product_id/related', async(req, res) => {
  try {

  } catch (error) {
    console.log("error in related server request: ", error);
  }
});

*/

app.listen(PORT, () => {
  console.log(`server has started on port ${PORT}`)
});