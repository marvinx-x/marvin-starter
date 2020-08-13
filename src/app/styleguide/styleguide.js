'use strict';

require( 'webpack-icons-installer' ); //load ALL icons
// require('webpack-icons-installer/font-awesome'); //load only font-awesome icons
// require('webpack-icons-installer/google');  //load only google material-design-icons
// require( 'webpack-icons-installer/bootstrap' );

import './styleguide.scss';
import { utils } from '../assets/scripts/utils';
import { navigation } from '../components/nav/nav';
import { logo } from '../components/header/header';

utils();
navigation();
logo();


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
