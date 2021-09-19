'use strict';

import '../assets/fonts/stylesheet.css';
import './styleguide.scss';

import { navigation } from './../components/nav/nav';
import { utils } from './../assets/scripts/utils';
import { logo } from './../components/header/header';

utils();
logo();
navigation();

function hsl() {
  const getRGB = (str) => {
    var match = str.match(/rgba?\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})\)?(?:, ?(\d(?:\.\d?))\))?/);
    return match ? {
      red: match[1],
      green: match[2],
      blue: match[3]
    } : {};
  }

  const RGBToHSL = (r, g, b) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const l = Math.max(r, g, b);
    const s = l - Math.min(r, g, b);
    const h = s
      ? l === r
        ? (g - b) / s
        : l === g
        ? 2 + (b - r) / s
        : 4 + (r - g) / s
      : 0;
    return [
      60 * h < 0 ? 60 * h + 360 : 60 * h,
      100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
      (100 * (2 * l - s)) / 2,
    ];
  };

  const liHsl = document.querySelectorAll('.styleguide-colors li:nth-of-type(1)');
  for(const li of liHsl){
    const color = window.getComputedStyle(li).getPropertyValue('background-color');
    const red = Number(getRGB(color).red);
    const green = Number(getRGB(color).green);
    const blue = Number(getRGB(color).blue);
    const hsls = RGBToHSL(red, green, blue);
    const txt = li.parentElement.previousElementSibling;
    txt.innerHTML = `hsl(${Math.round(hsls[0])}, ${Math.round(hsls[1])}%, ${Math.round(hsls[2])}%)`;
  }
}

hsl();

///////////////////////////////
import { categories, iconClasses } from '../assets/scripts/utils.js';

const catIcons = [categories[0], categories[1], categories[2] + "fontface", categories[2] + "unicode", categories[3] + "fontface", categories[3] + "unicode"];
const wrapClass = "wrap-icon";
const pages = document.querySelectorAll( '.styleguide-pages a' );

const urls = [];

pages.forEach( ( page ) => {
  urls.push( `/${page.innerHTML}` );
} );

urls.push( window.location.pathname );
urls.forEach( ( url, indexRequest ) => {
  requestUrls( url, indexRequest );
});

function requestUrls( url, indexRequest ) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onload = function (e) {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        domParser( e, indexRequest );
      } else {
        console.error(xhr);
      }
    }
  };
  xhr.onerror = function (e) {
    console.error(xhr.statusText);
  };
  xhr.send( null );
}

function domParser(e, indexRequest) {
  const parser = new DOMParser();
  const doc = parser.parseFromString( e.target.responseText, "text/html" );
  const icons = doc.querySelectorAll( iconClasses );
  noDuplicate( icons, indexRequest );
}

const arrIcons = [];
function noDuplicate(icons, indexRequest) {
  icons.forEach( ( icon ) => {
    arrIcons.push( icon.outerHTML.replace( /\s+/g, ' ' ).trim() );
  } );

  if ( indexRequest === urls.length - 1)
  {
    const noDuplicateIcons = new Set( arrIcons );
    noDuplicateIcons.forEach( ( icon ) => {
      icon = document.createRange().createContextualFragment( icon ).firstElementChild;
      const wrapper = document.createElement( 'div' );
      wrapper.className = wrapClass;

      document.querySelectorAll('.no-icon').forEach(el => el.remove());
      icon.parentNode.insertBefore(wrapper, icon);
      wrapper.appendChild( icon );

      nameIcon( icon );
      iconsCategory( wrapper, icon );
    } );
  }
}


function nameIcon(icon) {
  const txt = document.createElement( 'p' );

  icon.after( txt );
  if (icon.classList.contains(categories[0]+'-icon'))
  {

    const linkHref = icon.querySelector( 'use' ).getAttribute( 'xlink:href' );
    txt.innerHTML = linkHref.substring(linkHref.indexOf('#') + 8);
  }
  else if ( icon.classList.contains( categories[1]+'-icons' ) )
  {
    txt.innerHTML = icon.innerHTML;
  }
  else if ( icon.classList.contains( categories[2] ) || icon.classList.contains( categories[3] ) && icon.tagName === "I")
  {
    const classes = icon.getAttribute( 'class' );
    txt.innerHTML = classes.substring(classes.indexOf('-') + 1);
  }
  else if ( icon.classList.contains( categories[2]+'-icon' ) || icon.classList.contains( categories[3] ) && icon.tagName === "svg" )
  {
    txt.innerHTML = icon.querySelector('text').getAttribute('data-unicode');
  }
  txt.innerHTML = `\"${txt.innerHTML}\"`;
}


function iconsCategory( wrapper, icon ) {
  const str = icon.outerHTML.replace( /\s+/g, ' ' ).trim();
  const appendWrapper = ( cat ) => {
    const category = document.querySelector( `.styleguide-icons--${cat}` );
    category.append( wrapper );
  };
  str.includes( catIcons[0] ) ? appendWrapper(catIcons[0]) : null;
  str.includes( catIcons[1] ) ? appendWrapper(catIcons[1]) : null;
  str.includes( categories[2]+' '+categories[2]+'-' ) ? appendWrapper(catIcons[2]) :  null;
  str.includes( categories[2]+'-icon' ) ? appendWrapper(catIcons[3]) :  null;
  str.includes( categories[3] + ' ' + categories[3] + '-' ) ? appendWrapper(catIcons[4]) : null;
  str.includes( categories[3] + '\"' ) ? appendWrapper( catIcons[5] ) : null;
}

