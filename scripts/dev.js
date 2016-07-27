'use strict';
var settings = require('../config/settings');
var watchCss = require('./tasks/watch-css');
var serve = require('./tasks/serve');

function dev () {
  watchCss(settings);
  serve(settings);
}

dev();
