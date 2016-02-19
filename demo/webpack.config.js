var webpack   = require('webpack');
var path      = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  target: 'web',
  entry: {
    index: './src/index.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src')
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      templateContent: '<!DOCTYPE html>'
        + '<html>'
        + ' <head>'
        + '   <meta charset="iso-8859-1">'
        + '   <title>Redux Toastr Demo</title>'
        + '   <link href="https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300,700" rel="stylesheet" type="text/css">'
        + '   <link href="http://diegoddox.github.io/react-redux-toastr/2.0.1/react-redux-toastr.min.css" rel="stylesheet" type="text/css">'
        + '   <style>.wrapper {width: 100%; text-align: center; margin: 20px 0;} button{margin: 10px;}</style>'
        + ' </head>'
        + ' <body style="background-color: #fcfcfc;">'
        + '   <div id="app"></div>'
        + ' </body>'
        + '</html>',
      inject: 'body'
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    port: 3000,
    stats: {
      colors: true
    }
  }
};
