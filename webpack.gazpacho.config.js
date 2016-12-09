var webpack = require("webpack");
var path = require('path');

module.exports = {
  entry: {
    features: './tests/features/index.js',
    adapter: './tests/features/testem-adapter.js',
  },
  output: {
    path: path.resolve(__dirname, 'tmp'),
    filename: '[name].js',
  },
  target: 'web',
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
        }
      },
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },
      {
        test: require.resolve('gazpacho'),
        loader: 'expose-loader?gazpacho',
      },
    ],
  },
  resolve: {
    root: [
      path.resolve(__dirname),
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'node_modules/glimmer-engine/dist/node_modules'),
    ],
    modulesDirectories: ['node_modules',],
  },
  eslint: {
    configFile: '.eslintrc.js',
  },
};
