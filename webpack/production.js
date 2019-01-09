const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpackBase = require('./base');


webpackBase.devtool = 'cheap-module-source-map';

webpackBase.module.rules.push(
  {
    test: /\.css$/,
    exclude: [/node_modules/],
    use: [
      {loader: MiniCssExtractPlugin.loader},

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
  }
);

webpackBase.plugins.push.apply(webpackBase.plugins, [
  new MiniCssExtractPlugin()
]);

module.exports = webpackBase;
