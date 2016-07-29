var path = require('path');
var webpack = require('webpack');
var settings = require('./settings');

var entries = {};
settings.javascript.entryFiles.forEach(function (filePath) {
  entries[path.basename(filePath)] = [
    // For hot style updates
    'webpack/hot/dev-server',
    // The script refreshing the browser on none hot updates
    'webpack-dev-server/client?http://localhost:8080',
    filePath];
});

module.exports = {
  devtool: 'cheap-module-eval-source-map',
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
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
