var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var settings = require('./settings');

var entries = {};
settings.javascript.entryFiles.forEach(function (filePath) {
  entries['js/' + path.basename(filePath)] = [
    // // For hot style updates
    // 'webpack/hot/dev-server',
    // The script refreshing the browser on none hot updates
    'webpack-dev-server/client?http://localhost:8080',
    filePath];
});

settings.css.entryFiles.forEach(function (filePath) {
  entries['css/' + path.basename(filePath)] = [
    // The script refreshing the browser on none hot updates
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',   // only prevents reload on syntax errors
    filePath];
});

module.exports = {
  devtool: 'source-map',
  entry: entries,
  output: {
    path: settings.outputPath,
    filename: '[name]',
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/,
        query: {
          babelrc: false,
          presets: [
            'react',
            'es2015',
            'stage-0'
          ]
        }
      },
      {
        test:   /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
      }
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
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
    new ExtractTextPlugin('[name]'),
    new webpack.HotModuleReplacementPlugin()
  ]
};
