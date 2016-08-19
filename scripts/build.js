'use strict';
var settings = require('../config/settings');
var buildJavascript = require('./tasks/build-javascript');

function build () {
  buildJavascript(settings);
}

build();
