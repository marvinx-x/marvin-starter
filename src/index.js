'use strict';


require( 'webpack-icons-installer' ); //load ALL icons
// require('webpack-icons-installer/font-awesome'); //load only font-awesome icons
// require('webpack-icons-installer/google');  //load only google material-design-icons
// require('webpack-icons-installer/bootstrap');


import './app/assets/styles/styles.scss';
import {
  navigation
} from './app/components/nav/nav';
import {
  logo
} from './app/components/header/header';

navigation();
logo();

let resizeTimer;
window.addEventListener( 'resize', () => {
  document.body.classList.add( 'resize-animation-stopper' );
  clearTimeout( resizeTimer );
  resizeTimer = setTimeout( () => {
    document.body.classList.remove( 'resize-animation-stopper' );
  }, 100 );
} );

// import {
// 	gsap,
// 	Core,
// 	timelineLite,
// 	timelineMax,
// 	TimelineLite,
// 	TimelineMax,
// 	TweenMax,
// 	TweenLite,
// 	Plugins,
// 	CSSPlugin,
// 	AttrPlugin,
// 	BezierPlugin,
// 	DirectionalRotationPlugin,
// 	RoundPropsPlugin,
// 	Power0,
// 	Power1,
// 	Power2,
// 	Power3,
// 	Power4,
// 	Back,
// 	Bounce,
// 	Circ,
// 	Cubic,
// 	Elastic,
// 	Expo,
// 	Linear,
// 	Quad,
// 	Quart,
// 	Quint,
// 	RoughEase,
// 	Sine,
// 	Strong,
// 	SlowMo,
// 	CustomEase,
// 	SteppedEase,

// } from 'gsap/all';
