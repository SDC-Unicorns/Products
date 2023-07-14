require('dotenv').config();
const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  mode: "development",

  entry: path.join(__dirname, './src/server.ts'),

  devServer: {
    port: process.env.PORT,
  },

  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './client/src/index.html'
    })
  ]

}