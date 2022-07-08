const webpack = require("webpack")
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
const path = require('path')

module.exports = {
  /// Точка входа
  entry: {
    main: './frontend/index.js'
  },
  /// Из ts в js (babel-loader делает из js нужный браузеру)
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        exclude: /(node_modules|bower_components).*/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/env"]
        }
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      "process.env": "{}",
      "process.ENV": "{}",
      global: {}
    }),

  ],
  resolve: { //Читать файлы ts, js и т.д.
    extensions: ['.tsx', '.ts', '.js', '.json'],
    fallback:{
      "https": false,
      "http": false,
      "crypto": false
    }
  },
  devtool: 'source-map',
  experiments: {
    topLevelAwait: true,
  },
  output: {
    filename: 'frontend.js',
    path: path.resolve( 'dist/public/js'),
    chunkFilename: "[name].js",

  },
  mode: "production",
}