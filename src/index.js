import './app/assets/styles/styles.scss';
import { navigation } from './app/components/nav/nav';
import { logo } from './app/components/header/header';

navigation();
logo();

import { library, dom, config } from "@fortawesome/fontawesome-svg-core";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
config.autoReplaceSvg = 'nest';
config.measurePerformance = true;
library.add(faCheck);
dom.watch();

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
