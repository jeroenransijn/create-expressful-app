'use strict';
var path = require('path');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('../../config/webpack.config.dev');

function runWebpackDevServer () {
  new WebpackDevServer(webpack(config), {
      // We need to tell Webpack to serve our bundled application
      // from the build path. When proxying:
      // http://localhost:3000/dist -> http://localhost:8080/dist
      publicPath: '/dist/',

      // Configure hot replacement
      hot: true,

      // The rest is terminal configurations
      quiet: true,
      noInfo: true,
      stats: {
       colors: true
      }
    }).listen(8080, 'localhost', function (err, result) {
      if (err) {
        return console.log(err);
      }

      console.log('Dev Server Listening at http://localhost:8080/');
    });
}

module.exports = runWebpackDevServer;
