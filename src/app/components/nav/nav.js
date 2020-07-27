
import { TimelineMax, Quad } from 'gsap/all';
import 'hammerjs';

export function navigation() {
	const buttonNav = document.querySelectorAll( '.button-nav' );
	const nav = document.querySelector( 'nav[role="navigation"]' );
	const navClass = 'open';

	buttonNav.forEach( ( el, i ) => {
		/// BURGER MENU ICON ANIMATION
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

		nav.classList == navClass ? timeline.seek( '-=0', false ).reversed( !timeline.reversed() ) : null;

		const navEvents = () => {
			timeline.reversed() ? timeline.play() : timeline.reverse();
			nav.classList.toggle( navClass );
		};

		/// PRESS EVENT
		const pressEvent = new Hammer.Manager(el);
		const Press = new Hammer.Press({ time: 10 });
		pressEvent.add(Press);
		pressEvent.on( 'press', ( e ) => navEvents() );

		/// SWIPE EVENT
		const recognizer = {
			recognizers: [
				[Hammer.Swipe, {
					direction: Hammer.DIRECTION_HORIZONTAL
				}]
			]
		};

		let deltaX = 0;
		const swipeEvent = new Hammer.Manager( nav, recognizer );
		const Swipe = new Hammer.Swipe();
		swipeEvent.add( Swipe );

		swipeEvent.on('swipe', ( e ) => {
			deltaX = deltaX + e.deltaX;
			e.offsetDirection === 2 ? navEvents() : null;
		} );

		const links = nav.querySelectorAll( 'a' );
		links.forEach( ( el, i ) => {
			const swipeLinks = new Hammer.Manager( el, recognizer );
			swipeLinks.on( 'swipe', ( e ) => {
				e.srcEvent.preventDefault();
				return false;
			});
		});
	});
}
