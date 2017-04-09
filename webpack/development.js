const path = require('path');
const config = require('../config');
const baseConfig = require('./base');

baseConfig.entry.app = [
  `webpack-dev-server/client?http://localhost:${config.server_port}`,
  'webpack/hot/only-dev-server',
  `${config.path_base}/${config.dir_client}/client.js`
];

baseConfig.devtool = 'inline-source-map';

baseConfig.devServer = {
  contentBase: path.join(config.path_base, `/${config.dir_client}`),
  noInfo: false,
  port: config.server_port,
  hot: true,
  host: '0.0.0.0',
  stats: {
    historyApiFallback: true,
    assets: false,
    colors: true,
    version: false,
    hash: false,
    timings: true,
    chunks: true,
    chunkModules: false,
    children: false
  },
  historyApiFallback: true
};

module.exports = baseConfig;
