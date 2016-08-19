'use strict';
var settings = require('../config/settings');
var buildCss = require('./tasks/build-css');
var buildJavascript = require('./tasks/build-javascript');

function build () {
  buildJavascript(settings);
}

build();
