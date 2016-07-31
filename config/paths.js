/**
 * Based on https://raw.githubusercontent.com/facebookincubator/create-react-app/master/config/paths.js
 */

// TODO: we can split this file into several files (pre-eject, post-eject, test)
// and use those instead. This way we don't need to branch here.

var path = require('path');

// True when used as a dependency, false after ejecting
var isInNodeModules = (
  'node_modules' ===
  path.basename(path.resolve(path.join(__dirname, '..', '..')))
);

// Are we developing create-expressful-app locally?
var isInCreateAppSource = (
  process.argv.some(arg => arg.indexOf('--debug-template') > -1)
);

function resolve(relativePath) {
  return path.resolve(__dirname, relativePath);
}

if (isInCreateAppSource) {
  // create-expressful-app development: we're in ./config/
  module.exports = {
    serverEntry: resolve('../index.js'),
    appPublic: resolve('../public'),
    appPackageJson: resolve('../package.json'),
    appSrc: resolve('../src'),
    appNodeModules: resolve('../node_modules'),
    ownNodeModules: resolve('../node_modules')
  };
} else if (isInNodeModules) {
  // before eject: we're in ./node_modules/expressful-scripts/config/
  module.exports = {
    serverEntry: resolve('../../../index.js'),
    appPublic: resolve('../../../public'),
    appPackageJson: resolve('../../../package.json'),
    appSrc: resolve('../../../src'),
    appNodeModules: resolve('../..'),
    // this is empty with npm3 but node resolution searches higher anyway:
    ownNodeModules: resolve('../node_modules')
  };
} else {
  // after eject: we're in ./config/
  module.exports = {
    serverEntry: resolve('../index.js'),
    appPublic: resolve('../public'),
    appPackageJson: resolve('../package.json'),
    appSrc: resolve('../src'),
    appNodeModules: resolve('../node_modules'),
    ownNodeModules: resolve('../node_modules')
  };
}
