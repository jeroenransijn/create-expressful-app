'use strict';
var path = require('path');
var settings = require('./settings');

var entries = {};
settings.javascript.entryFiles.forEach(function (filePath) {
  entries[path.basename(filePath)] = [filePath];
});

module.exports = {
  devtool: 'source-map',
  entry: entries,
  output: {
    path: settings.javascript.destination,
    filename: '[name]',
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/,
        query: {
          babelrc: false,
          presets: [
            'react',
            'es2015',
            'stage-0'
          ]
        }
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
