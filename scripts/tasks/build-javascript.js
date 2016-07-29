'use strict';
var path = require('path');
var webpack = require('webpack');
var config = require('../../config/webpack.config.prod');

function buildJavascript (settings) {

  webpack(config).run(function (err, stats) {
    if (err) {
      console.error(err);
    }
    console.log(stats.toString({
      chunks: false, // Makes the build much quieter
      hash: false,
      colors: true
    }));
  });

}

module.exports = buildJavascript;
