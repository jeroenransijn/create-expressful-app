var nodemon = require('nodemon');

function serve (settings) {
  var env = process.env.NODE_ENV || 'development';

  nodemon({
    script: settings.server.entry,
    ext: 'js html cson json nunj nunjucks mustache hbs',
    env: { 'NODE_ENV': env }
  }).on('readable', function () {
    this.stdout.on('data', function (chunk) {
      process.stdout.write(chunk);
    });
  });
}

module.exports = serve;
