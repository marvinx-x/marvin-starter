import './assets/styles/styles.scss';

import {
	gsap,
	Core,
	timelineLite,
	timelineMax,
	TimelineLite,
	TimelineMax,
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
	SteppedEase
} from 'gsap/all';

const buttonNav = document.querySelectorAll('.button-nav');
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
    ease : Quad.easeOut
  } )
    .to( iconRects[0], duration, { y: spaceLines }, 'position' )
    .to( iconRects[2], duration, { y: -spaceLines }, 'position' )
    .to( iconRects[0], duration, { rotation: 135, transformOrigin: '50% 50%', }, 'rotate' )
    .to( iconRects[2], duration, { rotation: 225, transformOrigin: '50% 50%', }, 'rotate' )
    .to( iconRects[1], duration, { scaleX: 0, transformOrigin: '50% 50%', }, 'rotate' );

  el.addEventListener( 'click', ( e ) => {
    timeline.reversed() ? timeline.play() : timeline.reverse();
    nav.classList.toggle( 'open' );
  });
});
