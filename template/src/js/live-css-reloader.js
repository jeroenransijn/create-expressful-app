/**
 * Live CSS reloader *only use in Development*
 * ---
 * This script is connected to the Webpack Dev Server
 * and reloads every css file if there is an update.
 */
window.addEventListener('message', function (e) {
  if (e.data.search('webpackHotUpdate') === -1) return;
  console.log('Reloading css', e.data);

  var links = document.querySelectorAll('link');

  for (var i = 0, link; link = links[i]; i++) {
    if (link.href.indexOf('http') > -1) {
      var linkHref = link.href;
      link.href = 'about:blank';
      link.href = linkHref;
    }
  }
}, false);
console.log('Live CSS reloader initialized.');
