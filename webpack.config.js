"use strict";
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const loaders = require('./webpack-loaders');

module.exports = {
  entry: [
    'react-dev-utils/webpackHotDevClient',
    './src/index.jsx', // your app's entry point
  ],
  devtool: process.env.WEBPACK_DEVTOOL || 'cheap-module-source-map',
  output: {
    publicPath: '/',
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      ui: path.resolve(__dirname, 'src/js/uxComponent')
    }
  },

  module: {
    rules: loaders,
  },

  devServer: {
    contentBase: "./public",
    // do not print bundle build stats
    noInfo: true,
    // enable HMR
    hot: true,
    // embed the webpack-dev-server runtime into the bundle
    inline: true,
    // serve index.html in place of 404 responses to allow HTML5 history
    historyApiFallback: true,
    port: 3000,
    proxy: {
      "/api": "http://localhost:3001"
    }
  },

  plugins: [
    new ExtractTextPlugin({
      filename: 'style.css',
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      filename: './public/index.html',
      template: './src/template.html',
      files: {
        css: ['style.css'],
        js: [ "bundle.js"],
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
  ]
};
