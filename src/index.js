import './assets/styles/styles.scss';

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



function navigation() {
	const buttonNav = document.querySelectorAll( '.button-nav' );
	const nav = document.querySelector('nav[role="navigation"]');

	buttonNav.forEach( ( el, i ) => {
		const iconRects = el.querySelectorAll( 'rect' );
		const duration = parseFloat( window.getComputedStyle(nav, null ).getPropertyValue( "transition-duration" ) ) / 2;
		const heightGroup = iconRects[i].parentElement.getBBox().height;
		const heightLine = parseInt(iconRects[i].attributes.height.nodeValue);
		const spaceLines = parseInt(heightLine + (heightGroup - heightLine*3) / 2);

		const timeline = new TimelineMax( {
			paused: true,
			reversed: true,
			ease : Quad.easeInOut
		} )
			.to( iconRects[0], duration, { y: spaceLines }, 'position' )
			.to( iconRects[2], duration, { y: -spaceLines }, 'position' )
			.to( iconRects[0], duration, { rotation: 135, transformOrigin: '50% 50%', }, 'rotate' )
			.to( iconRects[2], duration, { rotation: 225, transformOrigin: '50% 50%', }, 'rotate' )
			.to( iconRects[1], duration, { scaleX: 0, transformOrigin: '50% 50%', }, 'rotate' );

		const navEvents = () => {
			timeline.reversed() ? timeline.play() : timeline.reverse();
			nav.classList.toggle( 'open' );
		};

		el.addEventListener( 'click', ( e ) => navEvents());
		const manager = new Hammer.Manager(nav);
		const Swipe = new Hammer.Swipe();
		manager.add(Swipe);
		let deltaX = 0;

		manager.on( 'swipe', function ( e ) {
			deltaX = deltaX + e.deltaX;
			e.offsetDirection === 2 ? navEvents() : null;
		});
	});
}




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

navigation();
iconLogo();


