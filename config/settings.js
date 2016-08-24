'use strict';
var glob = require('glob');
var path = require('path');
var paths = require('./paths');

module.exports = Object.assign({}, paths, {
  "javascript": {
    "entryFiles": glob.sync(path.join(paths.appSrc, "/js/*.js")),
  },
  "css": {
    "glob": path.join(paths.appSrc, "/css/**/*.css"),
    "entryFiles": glob.sync(path.join(paths.appSrc, "/css/*.css")),
    "formatOnSave": true
  },
  "outputPath": path.join(paths.appPublic, 'dist')
});
