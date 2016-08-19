var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var settings = require('./settings');

var entries = {};
settings.css.entryFiles.forEach(function (filePath) {
  entries['css/' + path.basename(filePath)] = [filePath];
});

function configBase (options) {

  var moduleAssign = options.moduleAssign || {};
  var plugins = options.plugins || [];

  var config = {
    devtool: 'source-map',
    entry: Object.assign(entries, options.jsEntryFiles),
    output: {
      path: settings.outputPath,
      filename: '[name]',
      publicPath: '/'
    },
    module: Object.assign({
      loaders: [
        {
          test: /\.(js|jsx)$/,
          loader: 'babel-loader',
          exclude: /(node_modules|bower_components)/,
          query: require('./babel.dev')
        },
        {
          test:   /\.css$/,
          loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
        }
      ],
    }, moduleAssign),
    resolve: {
      extensions: ['', '.js', '.jsx']
    },
    eslint: {
      configFile: path.join(__dirname, 'eslint.js'),
      useEslintrc: false
    },
    postcss: function (bundler) {
      return {
        defaults: [
          // Transfer @import rule by inlining content, e.g. @import 'normalize.css'
          // https://github.com/postcss/postcss-import
          require('postcss-import')({ addDependencyTo: bundler }),
          require('postcss-cssnext')({
            browsers: ['last 1 version'],
            warnForDuplicates: false
          }),
          require('postcss-browser-reporter')(),
          require('postcss-reporter')()
        ]
      };
    },
    plugins: [
      new ExtractTextPlugin('[name]')
    ].concat(plugins)
  };

  config.
}

module.exports = configBase;
