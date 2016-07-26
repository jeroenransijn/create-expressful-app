'use strict';
var settings = require('../settings');
var buildCss = require('./tasks/build-css');

function build () {
  buildCss(settings);
}

build();
