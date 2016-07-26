'use strict';
var settings = require('../settings');
var watchCss = require('./tasks/watch-css');
var serve = require('./tasks/serve');

function start () {
  watchCss(settings);
  serve(settings);
}

start();
