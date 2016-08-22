'use strict';

var path = require('path');
var config = require('../../config');
var baseConfig = require('./base');

baseConfig.entry.app = [
  'webpack-dev-server/client?http://localhost:' + config.server_port,
  'webpack/hot/only-dev-server',
  config.path_base + '/' + config.dir_client + '/client.js'
];

baseConfig.devtool = 'inline-source-map';

baseConfig.devServer = {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Max-Age': 1
  },
  contentBase: path.join(config.path_base, '/' + config.dir_client),
  noInfo: false,
  port: config.server_port,
  hot: true,
  stats: {
    historyApiFallback: true,
    assets: false, //the flag for the assets out-puted before
    colors: true,
    version: false,
    hash: false,
    timings: true,
    chunks: true, //these chunks seem more useful for dev
    chunkModules: false,
    children: false
  },
  historyApiFallback: true
};

module.exports = baseConfig;
