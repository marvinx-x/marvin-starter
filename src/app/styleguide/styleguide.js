'use strict';

// require( 'webpack-icons-installer' ); //load ALL icons
// require('webpack-icons-installer/font-awesome'); //load only font-awesome icons
// require('webpack-icons-installer/google');  //load only google material-design-icons
// require( 'webpack-icons-installer/bootstrap' );

import '../assets/fonts/stylesheet.css';
import './styleguide.scss';
import { utils } from '../assets/scripts/utils';
import { navigation } from '../components/nav/nav';
import { logo } from '../components/header/header';

utils();
navigation();
logo();

const sass = require( 'sass-extract-loader!./styleguide.scss' );
const globalSass = sass.global;
const colorValues = Object.keys( globalSass.$colors.value );

document.querySelectorAll( '.styleguide-colors p' ).forEach( ( el, i ) => {
  const color = colorValues[i];
  switch (color) {
    case 'primary':
      const huePrimary = globalSass.$colors.value.primary.value.hue.value;
      const saturationPrimary = globalSass.$colors.value.primary.value.saturation.value;
      const lightnessPrimary = globalSass.$colors.value.primary.value.lightness.value;
      el.innerHTML = `hsl(${huePrimary}, ${saturationPrimary}%, ${lightnessPrimary}%)`;
      break;
    case 'dark':
      const hueDark = globalSass.$colors.value.dark.value.hue.value;
      const saturationDark = globalSass.$colors.value.dark.value.saturation.value;
      const lightnessDark = globalSass.$colors.value.dark.value.lightness.value;
      el.innerHTML = `hsl(${hueDark}, ${saturationDark}%, ${lightnessDark}%)`;
      break;
    case 'neutral':
      const hueNeutral = globalSass.$colors.value.neutral.value.hue.value;
      const saturationNeutral = globalSass.$colors.value.neutral.value.saturation.value;
      const lightnessNeutral = globalSass.$colors.value.neutral.value.lightness.value;
      el.innerHTML = `hsl(${hueNeutral}, ${saturationNeutral}%, ${lightnessNeutral}%)`;
      break;
    case 'light':
      const hueLight = globalSass.$colors.value.light.value.hue.value;
      const saturationLight = globalSass.$colors.value.light.value.saturation.value;
      const lightnessLight = globalSass.$colors.value.light.value.lightness.value;
      el.innerHTML = `hsl(${hueLight}, ${saturationLight}%, ${lightnessLight}%)`;
      break;
  }
} );




