'use strict';
var fs = require('fs');
var chokidar = require('chokidar');
var stylefmt = require('stylefmt');
var postcss = require('postcss');
var settings = require('../../config/settings');

function cssFormatting () {
  // Initialize watcher.
  var watcher = chokidar.watch(settings.css.glob, {
    ignored: /[\/\\]\./,
    persistent: true
  });

  // 'add', 'addDir' and 'change' events also receive stat() results as second
  // argument when available: http://nodejs.org/api/fs.html#fs_class_fs_stats
  watcher.on('change', function (path, stats) {
    fs.readFile(path, { encoding: 'utf-8' }, function (err, data) {
      if (err) throw err;

      postcss([
        stylefmt
      ]).process(data)
        .then(function (result) {
          fs.writeFile(path, result.css, function (err) {
            if (err) throw err;
            console.log('css formatted for:', path);
          });
        }).catch(function (err) {
          console.error('css formatting error:', err);
        });
    });
  });
}

module.exports = cssFormatting;
