/**
  * This is the entrypoint of your website
  * It is important this file is named `index.js` and stays here
  * You can put the rest of your server code in the server directory
  * E.G: const routes = require('./server/routes');
  * https://github.com/jeroenransijn/expressful
 */
const app = require('expressful')();
app.serveContent();
app.start();
