'use strict';

var webpack = require('webpack');
var webpackBase = require('./base');

webpackBase.devtool = 'cheap-module-source-map',

webpackBase.plugins.push(
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  })
);

module.exports = webpackBase;
