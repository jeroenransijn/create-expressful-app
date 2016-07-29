'use strict';
var watchCss = require('./tasks/watch-css');
var runWebpackDevServer = require('./tasks/run-webpack-dev-server');

function dev () {
  // Do a build before starting
  require('./build');
  watchCss(settings);
  runWebpackDevServer();
}

dev();
