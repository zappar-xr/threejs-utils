const webpack = require('webpack');
const baseConfig = require('./webpack.config.base');

baseConfig.plugins.push(new webpack.DefinePlugin({
  Z_STANDALONE: true,
}));
delete baseConfig.devtool;
module.exports = baseConfig;
