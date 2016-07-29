// --------------------
// Put this line in all your entry js files: /src/js/*.js
if (module.hot) { module.hot.accept(); } // DON'T REMOVE
// --------------------

function main () {
  // Put your client JavaScript here
}

document.addEventListener('DOMContentLoaded', function (event) {
  console.log('DOM fully loaded and parsed');
  main();
});
