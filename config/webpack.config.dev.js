var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var settings = require('./settings');
var configBase = require('./webpack.config.base');

var jsEntryFiles = {};
settings.javascript.entryFiles.forEach(function (filePath) {
  jsEntryFiles['js/' + path.basename(filePath)] = [
    // The script refreshing the browser on none hot updates
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    filePath];
});

module.exports = configBase({
  reactHot: true,
  jsEntryFiles: jsEntryFiles,
  moduleAssign: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint',
        include: settings.appSrc
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
});
