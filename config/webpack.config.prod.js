var webpack = require('webpack');
var path = require('path');
var settings = require('./settings');
var configBase = require('./webpack.config.base');

var jsEntryFiles = {};
settings.javascript.entryFiles.forEach(function (filePath) {
  jsEntryFiles['js/' + path.basename(filePath)] = [filePath];
});

module.exports = configBase({
  jsEntryFiles: jsEntryFiles,
  plugins: [
    // Search for equal or similar files and deduplicate them in the output
    // https://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
    new webpack.optimize.DedupePlugin(),

    // Minimize all JavaScript output of chunks
    // https://github.com/mishoo/UglifyJS2#compressor-options
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: true
      }
    })
  ]
});
