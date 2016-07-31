'use strict';
var glob = require('glob');
var path = require('path');
var paths = require('./paths');

module.exports = {
  "server": {
    // This is only used for development
    "entry": paths.serverEntry
  },
  "javascript": {
    "entryFiles": glob.sync(path.join(paths.appSrc, "/js/*.js")),
  },
  "css": {
    "entryFiles": glob.sync(path.join(paths.appSrc, "/css/*.css")),
    "formatOnSave": true
  },
  "outputPath": path.join(paths.appPublic, 'dist')
};
