var webpack = require("webpack");
var path = require('path');
var glob = require('glob').sync;

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'assets'),
    filename: 'app.js',
  },
  target: 'web',
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(sparkles.js|node_modules)/,
        loader: 'babel',
        query: {
          presets: ['es2015',],
        },
      },
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /(sparkles.js|node_modules)/,
      },
    ],
  },
  plugins: [],
  resolve: {
    root: [
      path.resolve(__dirname, 'src'),
    ],
    modulesDirectories: [
      'node_modules',
    ],
  },
  eslint: {
    configFile: path.resolve(__dirname, '../.eslintrc.js'),
  },
};
