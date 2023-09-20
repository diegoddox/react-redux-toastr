const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('../config');

module.exports = {
  target: 'web',
  entry: {
    app: path.join(config.path_base, '/' + config.dir_client + '/client.js')
  },
  output: {
    path: path.join(config.path_base + '/dist'),
    filename: '[name].[hash].js',
    publicPath: ''
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(jsx?)$/,
        exclude: [/node_modules/],
        use: ['babel-loader']
      }, {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        exclude: /node_modules/,
        loader: 'url-loader'
      }, {
        test: /\.scss$/,
        exclude: [/node_modules/],
        use: ['style-loader', 'css-loader', 'sass-loader']
      }, {
        test: /\.jpg$/,
        exclude: /node_modules/,
        loader: 'file-loader'
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
        + '   <title>React Redux Toastr</title>'
        + '   <meta name="viewport" content="width=device-width, initial-scale=1">'
        + '   <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">'
        + '   <link href="https://file.myfontastic.com/DK4y3Mj8zxvX2ADWpcWGnM/icons.css" rel="stylesheet">'
        + ' </head>'
        + ' <body>'
        + '   <div id="app"></div>'
        + ' </body>'
        + '</html>',
      inject: 'body'
    })
  ]
};
