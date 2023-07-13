/* shell command:  \i /users/victoriajquinto/Desktop/hr/SDC/Products/src/schema.sql; */
DROP DATABASE sdc;
CREATE DATABASE sdc;

CREATE TABLE cart (
  id SERIAL PRIMARY KEY,
  user_session INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  active INTEGER NOT NULL,
);
\COPY cart from '/USERS/victoriajquinto/Desktop/hr/SDC/Products/data/cart.csv' delimiter ',' header csv;

CREATE TABLE features (
  id INTEGER UNIQUE,
  product_id INTEGER NOT NULL,
  feature VARCHAR(100),
  value VARCHAR(255),
  PRIMARY KEY (id)
);
\COPY features from '/USERS/victoriajquinto/Desktop/hr/SDC/Products/data/features.csv' delimiter ',' header csv;

CREATE TABLE photos (
  id INTEGER UNIQUE,
  styleId INTEGER NOT NULL,
  url VARCHAR(500),
  thumbnail_url TEXT,
  PRIMARY KEY (id)
);
\COPY photos from '/USERS/victoriajquinto/Desktop/hr/SDC/Products/data/photos.csv' delimiter ',' header csv;

CREATE TABLE product (
  id INTEGER UNIQUE,
  name VARCHAR(255),
  slogan VARCHAR(255),
  description TEXT,
  category VARCHAR(255),
  default_price VARCHAR(255),
  PRIMARY KEY (id)
);
\COPY product from '/USERS/victoriajquinto/Desktop/hr/SDC/Products/data/product.csv' delimiter ',' header csv;

CREATE TABLE reviews (
  id INTEGER UNIQUE,
  product_id INTEGER,
  rating INTEGER,
  date TEXT,
  summary VARCHAR(255),
  body TEXT,
  recommend BOOLEAN,
  reported BOOLEAN,
  reviewer_name VARCHAR(255),
  reviewer_email VARCHAR(255),
  response VARCHAR(255),
  helpfulness INTEGER,
  PRIMARY KEY (id)
);
\COPY reviews from '/USERS/victoriajquinto/Desktop/hr/SDC/Products/data/reviews.csv' delimiter ',' header csv;

CREATE TABLE related (
  id SERIAL PRIMARY KEY,
  current_product_id INTEGER NOT NULL,
  related_product_id INTEGER NOT NULL
);

CREATE TABLE skus (
  id INTEGER UNIQUE,
  styleId INTEGER,
  size VARCHAR(15),
  quantity INTEGER,
  PRIMARY KEY (id)
);
\COPY skus from '/USERS/victoriajquinto/Desktop/hr/SDC/Products/data/skus.csv' delimiter ',' header csv;

CREATE TABLE styles (
  id INTEGER UNIQUE,
  productId INTEGER,
  name VARCHAR(255),
  sale_price VARCHAR(15),
  original_original INTEGER NOT NULL,
  default_style BOOLEAN,
  PRIMARY KEY (id)
);
\COPY styles from '/USERS/victoriajquinto/Desktop/hr/SDC/Products/data/styles.csv' delimiter ',' header csv;