var webpack = require("webpack");
var path = require('path');

module.exports = {
  entry: 'src/index.js',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'sparkles.js',
    library: 'sparkles',
    libraryTarget: 'umd',
  },
  target: 'node',
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015',],
        },
      },
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [],
  resolve: {
    root: [
      path.resolve(__dirname),
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'node_modules/glimmer-engine/dist/node_modules'),
    ],
    modulesDirectories: [
      'node_modules',
    ],
  },
  eslint: {
    configFile: '.eslintrc.js',
  },
};
