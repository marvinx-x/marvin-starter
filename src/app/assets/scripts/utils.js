require('webpack-icons-installer/font-awesome');
require('webpack-icons-installer/google');
require( 'webpack-icons-installer/bootstrap' );
require( 'van11y-accessible-simple-tooltip-aria/src/van11y-accessible-simple-tooltip-aria.es6' );

import $ from 'jquery';
import select2 from 'select2';
import 'select2/dist/css/select2.css';

import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import "lazysizes/plugins/unveilhooks/ls.unveilhooks";

const { detect } = require('detect-browser');
const browser = detect();

const categories = ["custom", "material", "fa", "glyphicon"];
const iconClasses = `.${categories[0]}-icon, .${categories[1]}-icons, .${categories[2]}-icon, .${categories[2]}, .${categories[3]}`;

function iconsLoad() {
	window.addEventListener( 'load', function () {
		const icons = document.querySelectorAll( '.material-icons, .fa, .glyphicon, .fa-icon, .custom-icon' );
		icons.forEach( ( icon ) => {
			icon.style.visibility = "visible";
			setTimeout(function(){
				icon.style.opacity = 1;
			}, 100);
		} );
	} );
}

function resize() {
  let resizeTimer;
  window.addEventListener( 'resize', () => {
    document.body.classList.add( 'resize-animation-stopper' );
    clearTimeout( resizeTimer );
    resizeTimer = setTimeout( () => {
      document.body.classList.remove( 'resize-animation-stopper' );
    }, 100 );
  } );
}

function requireAll(r) {
  r.keys().forEach(r);
}

function inputFile() {
  var inputs = document.querySelectorAll( '.input-file' );
	Array.prototype.forEach.call( inputs, function( input )
	{
		var label	 = input.nextElementSibling,
			labelVal = label.innerHTML;

		input.addEventListener( 'change', function( e )
		{
			var fileName = '';
			if( this.files && this.files.length > 1 )
				fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
			else
				fileName = e.target.value.split( '\\' ).pop();

			if( fileName )
				label.querySelector( 'span' ).innerHTML = fileName;
			else
				label.innerHTML = labelVal;
		});
		input.addEventListener( 'focus', function(){ input.classList.add( 'has-focus' ); });
		input.addEventListener( 'blur', function(){ input.classList.remove( 'has-focus' ); });
	});
}


function selects() {
	$( 'select' ).select2( {
		width: 'style',
		minimumResultsForSearch: Infinity
	});
}

function notSafari() {
	if ( browser && browser.name === 'safari' || browser.name === 'ios' )
	{
		const imgs = document.getElementsByTagName( "img" );
		imgs.forEach( ( img ) => {
			if ( img.getAttribute('data-src').search( 'webp' ) !== -1 )
			{
				img.parentNode.classList.add( 'not-safari' );
			}
		});
	}
}

function heightBrowserMobile() {
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);
	window.addEventListener('resize', () => {
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
	});
}

export { categories, iconClasses };
export function utils() {
	resize();
	iconsLoad();
  requireAll( require.context( '../icons/', true, /\.svg$/ ) );
	inputFile();
	selects();
	notSafari();
	heightBrowserMobile();
}

