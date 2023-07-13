const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/fetcher');

const featureSchema = new mongoose.Schema({
  feature: String,
  value: String
});

const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    index: true,
    unique: true
  },
  campus: String,
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: String,
  created_at: String,
  updated_at: String,
  features: [featureSchema],
});

const photoSchema = new mongoose.Schema({
  thumbnail_url: String,
  url: String
});

const skuSchema = new mongoose.Schema({
  id: Number,
  quantity: Number,
  size: String
});

const styleSchema = new mongoose.Schema({
  style_id: Number,
  name: String,
  original_price: String,
  sale_price: String,
  default: Boolean,
  photos: [photoSchema],
  skus: [skuSchema]
});

const stylesSchema = new mongoose.Schema({
  styles: [styleSchema]
});

const ratingsSchema = new mongoose.Schema({
  1: Number,
  2: Number,
  3: Number,
  4: Number,
  5: Number
});

const recommendedSchema = new mongoose.Schema({
  true: Number,
  false: Number
});

const characteristics = new mongoose.Schema({
  Fit: Number,
  Length: Number,
  Comfort: Number,
  Quality: Number
});

const reviewsSchema = new mongoose.Schema({
  product_id: Number,
  ratings: {ratingsSchema},
  recommended: {recommendedSchema},
  characteristics: {characteristicsSchema},
});

const product = mongoose.model('product', productSchema);

const style = mongoose.model('styles', stylesSchema);

const reviews = mongoose.model('reviews', reviewsSchema);

