'use strict';


import './styleguide.scss';

import { navigation } from './../components/nav/nav';
import { utils } from './../assets/scripts/utils';
import { logo } from './../components/header/header';

import { Icons } from './scripts/icons';
import { styleguideColors } from './scripts/colors';

window.addEventListener('load',() => {
  utils();
  logo();
  navigation();
  Icons();
  new styleguideColors();
})



// function hsl() {
//   const getRGB = (str) => {
//     var match = str.match(/rgba?\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})\)?(?:, ?(\d(?:\.\d?))\))?/);
//     return match ? {
//       red: match[1],
//       green: match[2],
//       blue: match[3]
//     } : {};
//   }

//   const RGBToHSL = (r, g, b) => {
//     r /= 255;
//     g /= 255;
//     b /= 255;
//     const l = Math.max(r, g, b);
//     const s = l - Math.min(r, g, b);
//     const h = s
//       ? l === r
//         ? (g - b) / s
//         : l === g
//         ? 2 + (b - r) / s
//         : 4 + (r - g) / s
//       : 0;
//     return [
//       60 * h < 0 ? 60 * h + 360 : 60 * h,
//       100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
//       (100 * (2 * l - s)) / 2,
//     ];
//   };

//   const liHsl = document.querySelectorAll('.styleguide-colors li:nth-of-type(1)');
//   for(const li of liHsl){
//     const color = window.getComputedStyle(li).getPropertyValue('background-color');
//     const red = Number(getRGB(color).red);
//     const green = Number(getRGB(color).green);
//     const blue = Number(getRGB(color).blue);
//     const hsls = RGBToHSL(red, green, blue);
//     const txt = li.parentElement.previousElementSibling;
//     txt.innerHTML = `hsl(${Math.round(hsls[0])}, ${Math.round(hsls[1])}%, ${Math.round(hsls[2])}%)`;
//   }
// }

// hsl();

// ///////////////////////////////
