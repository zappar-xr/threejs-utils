const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  devtool: "inline-source-map",
  output: {
    path: path.resolve(__dirname, "../umd"),
    filename: "zappar-threejsutils.js",
    library: "ZapparUtils",
    libraryTarget: "umd",
  },
  resolve: {
    fallback: {
      fs: false,
    },
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".tsx", ".js", ".wasm"],
  },
  plugins: [],
  devServer: {
    static: "../dist",
  },
  module: {
    rules: [
      {
        test: /\.(zpt|png|gif|glb|gltf|jpe?g|ogg|mp3|obj|fbx|wav|ttf|fnf|woff|stl|mp4|hdr|webm)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "assets",
              name: "[sha256:hash:base64:16].[ext]",
            },
          },
        ],
      },
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: "ts-loader" },
      {
        test: /zcv\.wasm$/,
        type: "javascript/auto",
        loader: "file-loader",
      },
    ],
  },
};
