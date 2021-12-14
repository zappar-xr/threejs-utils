/* eslint-disable no-unused-expressions */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const baseConfig = require("./webpack.config.base");

baseConfig.entry = {
  index: "./tests/index.ts",
  billboard_jest: "./tests/billboard_jest.ts",
};

baseConfig.output = {
  filename: "[name].js",
  path: `${__dirname}test-dist`,
};

baseConfig.plugins = [
  new HtmlWebpackPlugin({
    template: "./tests/index.html",
    filename: "billboard_manual.html",
    chunks: ["index"],
  }),
  new HtmlWebpackPlugin({
    template: "./tests/index_jest.html",
    filename: "billboard_jest.html",
    chunks: ["billboard_jest"],
  }),
];

baseConfig.devServer = {
  static: "../test-dist",
  https: true,
  host: "0.0.0.0",
  hot: true,
  open: true,
  port: 8085,
};

baseConfig.output.path = path.resolve(__dirname, "test-dist");

module.exports = baseConfig;
