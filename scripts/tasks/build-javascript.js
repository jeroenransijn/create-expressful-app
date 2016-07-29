'use strict';
var glob = require('glob');
var gulp = require('gulp');
var browserify = require('browserify');

function buildJavascript (settings) {
  var entryFiles = glob.sync(settings.javascript.entryFiles);
  browserify({ entries: entryFiles })
    .transform('babelify', { presets: ['es2015', 'react'] })
    .bundle()
    .pipe(gulp.dest(settings.javascript.destination));
}

module.exports = buildJavascript;
