/**
 * Live CSS reloader *only use in Development*
 * ---
 * This script is connected to the Webpack Dev Server
 * and reloads every css file if there is an update.
 *
 * Note that the event triggered by Webpack doesn't describe
 * what file is updated. This mean that on every update, js or css,
 * onWebpackMessage is called.
 * https://github.com/webpack/webpack-dev-server/issues/542
 */
window.addEventListener('message', function onWebpackMessage (e) {
  if (e.data.search('webpackHotUpdate') === -1) return;

  var links = document.querySelectorAll('link');

  for (var i = 0, link; link = links[i]; i++) {

    if (link.href.indexOf('localhost') > -1) {
      var linkHref = link.href;

      if (linkHref.indexOf('style-reloader--safe-to-ignore') > -1) {
        link.href = linkHref;
      } else {
        link.href = linkHref + '?style-reloader--safe-to-ignore';
      }
    }
  }
}, false);
