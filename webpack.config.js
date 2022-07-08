const webpack = require("webpack")
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
const path = require('path')

module.exports = {
  /// Точка входа
  entry: {
    main: './main.ts'
  },
  
  /// Из ts в js (babel-loader делает из js нужный браузеру)
  module: {
    rules: [
      {
        test: /.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(), //Очистка вебпака, если корректирую файлы
  //   new webpack.HotModuleReplacementPlugin(), //Удаление/перезагрузка/подгрузка модулей для ускорения работы
  //   new webpack.DefinePlugin({ //заменяет переменные в коде с другими значениями или выражениями в компиляции времени
  //     "process.env": JSON.stringify(process.env),
  //     global: {}
  //   }),
  ],
  resolve: { //Читать файлы ts, js и т.д.
    extensions: ['.tsx', '.ts', '.js', '.json'],
  },
  devtool: 'source-map',
  optimization: {
    concatenateModules:false,
    moduleIds:'named',

  },
  experiments: {
    topLevelAwait: true,
  },
  output: {
    filename: 'Classes.js',
    path: path.resolve( 'dist/backend'),
    chunkFilename: "[name].js",
    globalObject: "this",

    chunkFormat: 'commonjs',
    library:{
      type: 'commonjs'
    },
  },
  mode: "production",
  target: "node",
}