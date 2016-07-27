'use strict';
var settings = require('../config/settings');
var buildCss = require('./tasks/build-css');

function build () {
  buildCss(settings);
}

build();
