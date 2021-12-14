const webpack = require("webpack");
const baseConfig = require("./webpack.config.base");

baseConfig.externals = {
  three: "THREE",
  "@zappar/zappar-threejs": "ZapparThree",
};

baseConfig.plugins.push(
  new webpack.DefinePlugin({
    Z_STANDALONE: true,
  })
);
delete baseConfig.devtool;
module.exports = baseConfig;
