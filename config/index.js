'use strict';

const path = require('path');

module.exports = {
  env: process.env.NODE_ENV,
  path_base: path.resolve(__dirname, '../'),
  dir_client: 'development',
  server_port: process.env.NODE_PORT || 3000
};
