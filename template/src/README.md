# `./src` directory

In this directory you will find two sub directories `js` and `css`.

Every file that is directly inside of these sub directories are entry files for the build system.

For example the following structure:

* `/src/js/homepage.js`
* `/src/js/contact-page.js`
* `/src/js/components/form.js` (inside of another sub directory)
* `/src/js/components/lightbox.js` (inside of another sub directory)

Will result in the following output:

* `/dist/js/homepage.js`
* `/dist/js/contact-page.js`

## Including files in your views

Always link to the `dist` directory in your views:

```html
<!DOCTYPE html>
<html>
  <head>
    <!-- CSS in your head -->
    <link href="/dist/main.css">
  </head>
  <body>
    <!-- JavaScript at the end of for your page -->
    <script src="/dist/js/homepage.js"></script>
  </body>
</html>
```
