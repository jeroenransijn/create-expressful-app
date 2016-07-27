var path = require('path');
var paths = require('./paths');
var appPackage = require(paths.appPackageJson);

module.exports = {
  "server": {
    // This is only used for development
    "entry": path.join(paths.appSrc, appPackage.main)
  },
  "javascript": {
    "entryFiles": path.join(paths.appSrc, "/js/*.js"),
    "destination": path.join(paths.appBuild, "/js/")
  },
  "css": {
    "entryFiles": path.join(paths.appSrc, "/css/*.css"),
    "destination": path.join(paths.appBuild, "/css/"),
    "formatOnSave": true
  }
};
