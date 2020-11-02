# Styleguide starter

Netlife Research Metalsmith starter for living stylguides with Knyle Style Sheets (KSS).

Install the package:
`npm i starter-styleguide`

## Require and run like this:
```js
'use strict';

var starterStyleguide = require('starter-styleguide');

starterStyleguide.runKss();
```

Default config is:
```js
source: 'src/scss',
destination: 'dist/styleguide/',
css: [
    '../css/main.min.css',
    '../css/styleguide.min.css'
],
homepage: 'index.md',
placeholder: '{modifier}',
title: 'Styleguide',
template: __dirname+'/styleguide-template'
```

## Make your own config:
```js
starterStyleguide.extendConfig({ /* config overrides */ });
```

You can also add you own styleguide **template**, copy the folder _styleguide-template_ into your own projcect.

Example:
```js
'use strict';

var starterStyleguide = require('starter-styleguide');

starterStyleguide.extendConfig({
    css: [
        '../css/yourstyles.css',
        '../css/custom/customstyles.css'
    ],
    template: 'your-own-template'
});

starterStyleguide.runKss();
```

## KSS
Document in your stylesheets with KSS like this:
```js
// A button suitable for giving a star to someone.
//
// :hover             - Subtle hover highlight.
// .star-given        - A highlight indicating you've already given a star.
// .star-given:hover  - Subtle hover highlight on top of star-given styling.
// .disabled          - Dims the button to indicate it cannot be used.
//
// Styleguide 2.1.3.
a.button.star{
  ...
  &.star-given{
    ...
  }
  &.disabled{
    ...
  }
}
```
[kss documentation](http://warpspire.com/kss/syntax/)

### Dependencies
* [kss](http://warpspire.com/kss/)
* [Handlebars](http://handlebarsjs.com/)
