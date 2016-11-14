var Webpack = require('webpack'),
    path = require('path'),
    nodeModulesPath = path.resolve(__dirname, 'node_modules'),
    buildPath = path.resolve(__dirname, 'public'),
    sourcePath = path.resolve(__dirname, 'client', 'src', 'main.js');

var config = {
  devtool: 'source-map',
  entry: sourcePath,
  output: {
    path: buildPath,
    filename: 'app.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: [nodeModulesPath]
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      }
    ]
  }
};

module.exports = config;