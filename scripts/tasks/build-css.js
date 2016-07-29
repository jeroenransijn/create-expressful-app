'use strict';
var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');
var postcss = require('gulp-postcss');
var postcssImport = require('postcss-import');
var postcssCssnext = require('postcss-cssnext');
var cssnano = require('cssnano');
var postcssBrowserReporter = require('postcss-browser-reporter');

var processors = [
  postcssImport,
  postcssCssnext({
    browsers: ['last 1 version'],
    warnForDuplicates: false
  }),
  cssnano(),
  postcssBrowserReporter
];

/**
 * Build CSS with cssnext
 * ---
 * "You can literally write future-proof CSS and forget old preprocessor specific syntax."
 * READ MORE: http://cssnext.io/features/
 * cssnext is based on PostCSS
 */
function buildCss (settings) {
  gulp.src(settings.css.entryFiles)
    .pipe(plumber({ errorHandler: streamError }))
    .pipe(sourcemaps.init())
    .pipe(postcss(processors))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(settings.css.destination));
}

function streamError (err) {
  gutil.beep();
  gutil.log(err instanceof gutil.PluginError ? err.toString() : err.stack);
}

module.exports = buildCss;
