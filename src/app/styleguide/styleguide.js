'use strict';

import '../assets/fonts/stylesheet.css';
import './styleguide.scss';
import { utils } from '../assets/scripts/utils';
import { navigation } from '../components/nav/nav';
import { logo } from '../components/header/header';

utils();
navigation();
logo();

function hsl() {
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
}

hsl();

///////////////////////////////


const arrIconsHtml = [];

function iconTypes(url) {

  const request = new XMLHttpRequest();
  const categories = ["custom", "material", "fa", "glyphicon"];
  const iconClasses = `.${categories[0]}-icon, .${categories[1]}-icons, .${categories[2]}-icon, .${categories[2]}, .${categories[3]}`;
  const catIcons = [categories[0], categories[1], categories[2] + "Fontface", categories[2] + "Unicode", categories[3] + "Fontface", categories[3] + "Unicode"];
  const wrapIcon = "wrap-icon";

  request.addEventListener( "load", function ( evt ) {
    const parser = new DOMParser();
    const doc = parser.parseFromString( evt.srcElement.response, "text/html" );
    const icons = doc.querySelectorAll( iconClasses );

    icons.forEach( ( el, i ) => {
      arrIconsHtml.push( el.outerHTML.replace(/\s+/g, ' ').trim() );
    } );

    const setNoDuplicate = new Set( arrIconsHtml );

    const arraysIcons = [];
    catIcons.forEach( ( key ) => {
      arraysIcons[key] = [];
    } );

  setNoDuplicate.forEach( ( icon ) => {
    const str = `<div class="${wrapIcon}">${icon}<p></p></div>`;
    str.includes( categories[0] ) ? arraysIcons.custom.push(str) : null;
    str.includes( categories[1] ) ? arraysIcons.material.push(str) : null;
    str.includes( categories[2]+' '+categories[2]+'-' ) ? arraysIcons.faFontface.push(str) :  null;
    str.includes( categories[2]+'-icon' ) ? arraysIcons.faUnicode.push(str) :  null;
    str.includes( categories[3] + ' ' + categories[3] + '-' ) ? arraysIcons.glyphiconFontface.push(str) : null;
    str.includes( categories[3] + '\"' ) ? arraysIcons.glyphiconUnicode.push( str ) : null;
  } );

  for (const key in arraysIcons) {
    const blocCat = document.querySelector( `.styleguide-icons--${key}` );
    blocCat.innerHTML = arraysIcons[key].toString().replace( /\,/g, " " );
  }

  document.querySelectorAll( `.${wrapIcon} p` ).forEach( ( el, i ) => {
    const icon = el.previousElementSibling;
    let nameIcon = "";
    if (icon.classList.contains(categories[0]+'-icon'))
    {
      const linkHref = icon.querySelector( 'use' ).getAttribute( 'xlink:href' );
      nameIcon = linkHref.substring(linkHref.indexOf('#') + 1);
    }
    else if ( icon.classList.contains( categories[1]+'-icons' ) )
    {
      nameIcon = icon.innerHTML;
    }
    else if ( icon.classList.contains( categories[2] ) || icon.classList.contains( categories[3] ) && icon.tagName === "I")
    {
      const classes = icon.getAttribute( 'class' );
      nameIcon = classes.substring(classes.indexOf('-') + 1);
    }
    else if ( icon.classList.contains( categories[2]+'-icon' ) || icon.classList.contains( categories[3] ) && icon.tagName === "svg" )
    {
      nameIcon = icon.querySelector('text').getAttribute('data-unicode');
    }
    el.innerHTML = `\"${nameIcon}\"`;
  } );
  }, false );

  request.open('GET', url, false),
  request.send();
}

const arrPages = ["index", "test", "styleguide"];
arrPages.forEach( ( el, i ) => {
  iconTypes(`/${el}.html`);
})

// console.log([...document.links].map(l => l.href))
