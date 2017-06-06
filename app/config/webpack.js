/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-disable global-require, no-confusing-arrow, max-len */

const path = require('path');
const rules = require('./webpack.rules.js');

module.exports = {

  // The entry point for the bundle
  entry: [
    "babel-polyfill",
    path.resolve(__dirname, '../src/main.js'),
  ],

  // Options affecting the output of the compilation
  output: {
    path: path.resolve(__dirname, '../public/dist'),
    filename: 'bundle.js',
  },

  resolve: {
    alias: {
      App: path.resolve(__dirname, "../src")
    }
  },

  // Developer tool to enhance debugging, source maps
  // http://webpack.github.io/docs/configuration.html#devtool
  devtool: 'source-map',

  // What information should be printed to the console
  stats: {
    colors: true,
    reasons: true,
    hash: true,
    version: true,
    timings: true,
    chunks: true,
    chunkModules: true,
    cached: true,
    cachedAssets: true,
  },

  // Options affecting the normal modules
  module: { rules },
};
