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
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, "../src/index.ts")));

//PORT//
const PORT = process.env.PORT || 3000;

//ROUTES//
//get products
app.get('/products', async(req, res) => {
  try {
    const allProducts = await pool.query('SELECT * FROM product LIMIT 500');
    res.status(200).send(allProducts);
  } catch (error) {
    console.log("error in product server request: ", error);
    res.status(400).send(error);
  }
});

//get product and corresponding features
app.get('/products/:product_id', async(req, res) => {
  try {
    const id = req.params.product_id;
    let indivProduct = await pool.query('SELECT * FROM product WHERE id = $1', id);
    const features = await pool.query('SELECT feature, value FROM features WHERE product_id = $1', id);
    let result = {...indivProduct[0], features};
    res.status(200).send(result);
  } catch (error) {
    console.log("error in productS server request: ", error);
    res.status(400).send(error);
  }
});

//get styles and corresponding skus and photos
app.get('/products/:product_id/styles', async(req, res) => {
  try {
    const product_id = req.params.product_id;
    let results = await pool.query('SELECT id, name, sale_price, original_price, default_style FROM styles WHERE productId = $1', product_id);
    let styleIds = results.map(style => {return style.id});

    const photos = await styleIds.map(styleId => {
      return getPhotos(styleId);
    });

    const skus = await styleIds.map(styleId => {
      return getSkus(styleId);
    });

    let info = {
      product_id: product_id,
      results: results,
    }
    res.status(200).send(skus);

  } catch (error) {
    console.log("error in styles/skus/photos server request: ", error);
    res.status(400).send(error);
  }
});

//get related
app.get('/products/:product_id/related', async(req, res) => {
  try {
    const currentProductId = req.params.product_id;
    const related = await pool.query('SELECT related_product_id FROM related WHERE current_product_id = $1', currentProductId);
    let result = related.map(object => {return object.related_product_id})
    res.status(200).send(result);
  } catch (error) {
    console.log("error in related server request: ", error);
    res.status(400).send(error);
  }
});

app.listen(PORT, () => {
  console.log(`server has started on port ${PORT}`)
});

//HELPERS

async function getPhotos (styleId){
  try {
    let photos = await pool.query('SELECT url, thumbnail_url FROM photos WHERE styleId = $1', styleId);
    // console.log(photos);
    return photos;
  } catch(error) {
    console.log('error in getPhotos: ', error)
  }
}

async function getSkus (styleId){
  try {
    let sku = await pool.query('SELECT id, size, quantity FROM skus WHERE styleId = $1', styleId);
    console.log(sku);
    return sku;
  } catch(error) {
    console.log('error in getSkus: ', error)
  }
}

