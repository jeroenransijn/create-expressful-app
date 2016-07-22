'use strict';
var settings = {
  javascript: {
    entryFiles: '**/src/js/*.js',
    destination: '**/dist/js/'
  },
  css: {
    entryFiles: '**/src/css/*.css',
    destination: '**/dist/css/'
  },
  cssFormatting: true
};

var fs = require('fs');

var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var nodemon = require('gulp-nodemon');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');

/**
 * CSS
 * ---
 * "You can literally write future-proof CSS and forget old preprocessor specific syntax."
 * READ MORE: http://cssnext.io/features/
 * cssnext is based on PostCSS
 */
var vanillaPostcss = require('postcss');
var postcss = require('gulp-postcss');
var postcssImport = require('postcss-import');
var postcssCssnext = require('postcss-cssnext');
var cssnano = require('cssnano');
var postcssBrowserReporter = require('postcss-browser-reporter');
var stylefmt = require('stylefmt');

function streamError (err) {
  gutil.beep();
  gutil.log(err instanceof gutil.PluginError ? err.toString() : err.stack);
}

function styles () {
  var processors = [
    postcssImport,
    postcssCssnext({
      browsers: ['last 1 version'],
      warnForDuplicates: false
    }),
    cssnano(),
    postcssBrowserReporter
  ];

  gulp.src(settings.css.entryFiles)
    .pipe(plumber({ errorHandler: streamError }))
    .pipe(sourcemaps.init())
    .pipe(postcss(processors))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(settings.css.destination));
}

/**
 * Watches the css
 * - Runs stylefmt on file save
 * - Runs styles and compiles all the css
 */
function watch () {
  gulp.watch(settings.css.entryFiles, function (event) {

    // Perfectly format CSS across the team with stylefmt
    if (settings.cssFormatting) {
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
        .on('end', styles);

    } else {
      styles();
    }
  });
}

function serve () {
  var env = process.env.NODE_ENV || 'development';

  nodemon({
    script: 'app.js',
    ext: 'js html cson json nunj nunjucks mustache hbs',
    env: { 'NODE_ENV': env }
  }).on('readable', function () {
    this.stdout.on('data', function (chunk) {
      process.stdout.write(chunk);
    });
  });
}

function start () {
  styles();
  watch();
  serve();
}

start();
