'use strict';
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var stylefmt = require('stylefmt');
var buildCss = require('./build-css');
var settings = require('../../config/settings');

/**
 * Watches CSS
 * ---
 * - Runs stylefmt on file save
 * - Runs styles and compiles all the css
 */
function watchCss () {
  gulp.watch(settings.css.entryFiles, function (event) {

    // Perfectly format CSS across the team with stylefmt
    if (settings.css.formatOnSave) {
      // [Using event.path for source and destination](https://github.com/gulpjs/gulp/issues/212)
      // Split the filename from the path.
      var filename = event.path.split('/');
      filename = filename[filename.length - 1];
      // For some reason it needs a base to work
      var base = event.path.replace(filename, '');

      gulp.src(event.path, { base: base })
        .pipe(plumber({ errorHandler: streamError }))
        .pipe(postcss([
          stylefmt
        ]))
        .pipe(gulp.dest(base))
        .on('end', buildCss);

    } else {
      buildCss();
    }
  });
}

module.exports = watchCss;
