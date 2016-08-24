'use strict';
var glob = require('glob');
var path = require('path');
var paths = require('./paths');
var editorconfig = require('editorconfig');

module.exports = Object.assign({}, paths, {
  "javascript": {
    "entryFiles": glob.sync(path.join(paths.appSrc, "/js/*.js")),
  },
  "css": {
    "editorconfig": editorconfig.parseSync(path.join(paths.appSrc, "/css/*.css")) || {},
    "glob": path.join(paths.appSrc, "/css/**/*.css"),
    "entryFiles": glob.sync(path.join(paths.appSrc, "/css/*.css")),
    "formatOnSave": true
  },
  "outputPath": path.join(paths.appPublic, 'dist')
});
