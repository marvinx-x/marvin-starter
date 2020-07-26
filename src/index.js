import './app/assets/styles/styles.scss';

import {
	gsap,
	Core,
	timelineLite,
	timelineMax,
	TimelineLite,
	TimelineMax,
	TweenMax,
	TweenLite,
	Plugins,
	CSSPlugin,
	AttrPlugin,
	BezierPlugin,
	DirectionalRotationPlugin,
	RoundPropsPlugin,
	Power0,
	Power1,
	Power2,
	Power3,
	Power4,
	Back,
	Bounce,
	Circ,
	Cubic,
	Elastic,
	Expo,
	Linear,
	Quad,
	Quart,
	Quint,
	RoughEase,
	Sine,
	Strong,
	SlowMo,
	CustomEase,
	SteppedEase,

} from 'gsap/all';

import 'hammerjs';
import { navigation } from './app/components/nav/nav';


navigation();



function iconLogo() {
	const logo = document.querySelectorAll( '.logo' );

	logo.forEach( ( el, i ) => {
		const iconLogo = el.querySelector( 'svg' );
		const clone = iconLogo.cloneNode(true);
		iconLogo.after( clone );
		const iconBackLogo = iconLogo.nextSibling;
		const duration = 1.5;
		gsap.set( iconBackLogo, { rotationY: 180 } )

		const timeline = new TimelineLite({
			paused: true,
			reversed: true,
			ease : Circ.easeInOut
		})
			.to( iconLogo, duration, { rotationY: 360 }, 'rotate' )
			.to( iconBackLogo, duration, { rotationY: -180 }, 'rotate' )

		el.addEventListener( 'mouseenter', ( e ) => timeline.reversed() ? timeline.play() : null);
		el.addEventListener( 'mouseleave', ( e ) => {
			TweenLite.delayedCall(.3, function(){
				timeline.reverse();
		 });
		});
	});
}


iconLogo();


import { library, dom, config } from "@fortawesome/fontawesome-svg-core";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";

config.autoReplaceSvg = 'nest';
config.measurePerformance = true;

library.add(faCheck);
dom.watch();

