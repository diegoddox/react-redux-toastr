const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpackBase = require('./base');

webpackBase.devtool = 'cheap-module-source-map';

webpackBase.module.rules.push(
  {
    test: /\.css$/,
    exclude: [/node_modules/],
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'clean-css-loader',
          options: {
            compatibility: 'ie9',
            level: 2,
            inline: ['remote']
          }
        }
      ]
    })
  }
);

webpackBase.plugins.push.apply(webpackBase.plugins, [
  new ExtractTextPlugin('styles.css'),
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: true,
    minimize: true,
    compress: {
      warnings: false
    }
  })
]);

module.exports = webpackBase;
