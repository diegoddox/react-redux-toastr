'use strict';

var webpack   = require('webpack');
var path      = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var config = require('../../config');

const baseSrcPath = path.join(config.path_base, '/src');

module.exports = {
  target: 'web',
  entry: {
    app: path.join(config.path_base, '/src/client.js')
  },
  output: {
    path: path.join(config.path_base + '/dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loaders: ['eslint'],
        exclude: /node_modules/,
        include: baseSrcPath
      }
    ],
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel'],
        include: baseSrcPath
      }, {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        exclude: /node_modules/,
        loader: 'url-loader',
        include: baseSrcPath
      }, {
        test: /\.less$/,
        exclude: /node_modules/,
        loader: 'style!css!less',
        include: baseSrcPath
      }, {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
        include: baseSrcPath
      }, {
        test: /\.jpg$/,
        exclude: /node_modules/,
        loader: 'file-loader',
        include: baseSrcPath
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"' + process.env.NODE_ENV + '"'
      }
    }),
    new HtmlWebpackPlugin({
      templateContent: ''
        + '<!DOCTYPE html>'
        + '<html>'
        + ' <head>'
        + '   <meta charset="iso-8859-1">'
        + '   <title>React Redux Modal</title>'
        + '   <meta name="viewport" content="width=device-width, initial-scale=1">'
        + '   <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">'
        + '   <link href="http://diegoddox.github.io/react-redux-modal/0.1.0/react-redux-modal.min.css" rel="stylesheet">'
        + ' </head>'
        + ' <body>'
        + '   <div id="app"></div>'
        + ' </body>'
        + '</html>',
      inject: 'body'
    })
  ]
};
