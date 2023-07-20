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
    const allProducts = await pool.query('SELECT * FROM product LIMIT 200');
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
    let queryString =
    `SELECT
      p.*,
      JSONB_AGG(
        JSONB_BUILD_OBJECT(
          'feature', f.feature,
          'value', f.value
        )
      ) AS features
      FROM
        product p
      INNER JOIN
        features f ON p.id = f.product_id
      WHERE p.id = $1
      GROUP BY
        p.id, p.name;`;
    let results = await pool.query(queryString, id);
    res.status(200).send(results);
  } catch (error) {
    console.log("error in productS server request: ", error);
    res.status(400).send(error);
  }
});

//get styles and corresponding skus and photos
app.get('/products/:product_id/styles', async(req, res) => {
  try {
    const product_id = req.params.product_id;
    const queryString = `SELECT
    p.id AS product_id,
    json_agg(json_build_object(
      'style_id', s.id,
      'name', s.name,
      'original_price', s.original_price,
      'sale_price', s.sale_price,
      'default?', s.default_style,
      'photos', photos,
      'skus', skus
    ) ORDER BY s.id) AS results
    FROM
      product p
    JOIN
      styles s ON p.id = s.productId
    LEFT JOIN LATERAL (
      SELECT json_agg(json_build_object(
        'thumbnail_url', ph.thumbnail_url,
        'url', ph.url
      )) AS photos
      FROM photos ph
      WHERE s.id = ph.styleId
    ) photos ON true
    LEFT JOIN LATERAL (
      SELECT json_object_agg(sk.id, json_build_object(
        'quantity', sk.quantity,
        'size', sk.size
      )) AS skus
      FROM skus sk
      WHERE s.id = sk.styleId
    ) skus ON true
    WHERE
      p.id = $1
    GROUP BY
      p.id;`
    let results = await pool.query(queryString, product_id);
    res.status(200).send(results);
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

// app.get('/loaderio-151677548dc745b7ce23f60ea89d7358/', async (req, res) => {
//   try{
//     res.status(200).send(process.env.LOADER_IO_TOKEN);
//   } catch (error) {
//     console.log('error in loaderio verification', error);
//   };
// });

app.get(`${process.env.LOADER_IO_ENDPOINT}`, async (req, res) => {
  try{
    res.status(200).send(process.env.LOADER_IO_TOKEN);
  } catch (error) {
    console.log('error in loaderio verification', error);
  };
});

app.listen(PORT, () => {
  console.log(`server has started on port ${PORT}`)
});




