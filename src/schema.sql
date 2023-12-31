/* shell command:  \i /users/victoriajquinto/Desktop/hr/SDC/Products/src/schema.sql; */
DROP DATABASE sdc;
DROP TABLE features;
DROP TABLE photos;
DROP TABLE product;
DROP TABLE related;
DROP TABLE skus;
DROP TABLE styles;
CREATE DATABASE sdc;
\c sdc;


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

CREATE TABLE related (
  id INTEGER UNIQUE,
  current_product_id INTEGER NOT NULL,
  related_product_id INTEGER NOT NULL,
  PRIMARY KEY (id)
);
\COPY related from '/USERS/victoriajquinto/Desktop/hr/SDC/Products/data/related.csv' delimiter ',' header csv;

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
  original_price INTEGER NOT NULL,
  default_style BOOLEAN,
  PRIMARY KEY (id)
);
\COPY styles from '/USERS/victoriajquinto/Desktop/hr/SDC/Products/data/styles.csv' delimiter ',' header csv;

CREATE INDEX ON product (id);
CREATE INDEX ON styles (productId);
CREATE INDEX ON photos (styleId);
CREATE INDEX ON skus (styleId);
CREATE INDEX ON features (product_id);
CREATE INDEX ON related (current_product_id);