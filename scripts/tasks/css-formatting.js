'use strict';
var Path = require('path');
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
        stylefmt({
          config: Path.join(settings.config, '.stylelintrc.js')
        })
      ]).process(data)
        .then(function (result) {
          if (result.css === data) return;
          fs.writeFile(path, result.css, function (err) {
            if (err) throw err;
            console.log('css formatted for:', subtractPath(path, settings.appSrc));
          });
        }).catch(function (err) {
          console.error('css formatting error:', err);
        });
    });
  });
}

function subtractPath (full, partial) {
  return full.substring(full.indexOf(partial) + partial.length);
}

module.exports = cssFormatting;
