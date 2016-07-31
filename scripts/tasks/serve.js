'use strict';
var nodemon = require('nodemon');
var settings = require('../../config/settings');

function serve () {
  var env = process.env.NODE_ENV || 'development';

  nodemon({
    script: settings.server.entry,
    ignore: ['src', 'public'],
    ext: 'js html cson json nunj nunjucks mustache hbs',
    env: { 'NODE_ENV': env }
  }).on('readable', function () {
    this.stdout.on('data', function (chunk) {
      process.stdout.write(chunk);
    });
  });
}

module.exports = serve;
