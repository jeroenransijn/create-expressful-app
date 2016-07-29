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
    "destination": path.join(paths.appDist, "/js/")
  },
  "css": {
    "entryFiles": path.join(paths.appSrc, "/css/*.css"),
    "destination": path.join(paths.appDist, "/css/"),
    "formatOnSave": true
  }
};
