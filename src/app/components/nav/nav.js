import 'hammerjs';

import { gsap, TimelineMax, Quad, ScrollToPlugin } from 'gsap/all';
gsap.registerPlugin(ScrollToPlugin);

// import exportedVars from '../../assets/scripts/_export.scss';

export function navigation() {
	const buttonNav = document.querySelectorAll('.button-nav');
	const nav = document.querySelector('nav[role="navigation"]');
	const navClass = 'open';
	const duration = parseFloat(window.getComputedStyle(nav, null).getPropertyValue('transition-duration')	) / 2;

	buttonNav.forEach((el, i) => {
		/*  BURGER MENU ICON ANIMATION */
		const iconRects = el.querySelectorAll('rect');
		const heightGroup = iconRects[i].parentElement.getBBox().height;
		const heightLine = parseInt(iconRects[i].attributes.height.nodeValue);
		const spaceLines = parseInt(heightLine + (heightGroup - heightLine * 3) / 2);

    const timeline = new TimelineMax( { paused: true, reversed: true, ease: Quad.easeInOut } )
      .to( iconRects[0], duration, { y: spaceLines }, 'position' )
			.to(iconRects[2],	duration,	{y: -spaceLines},'position')
			.to(iconRects[0],	duration,	{rotation: 135,transformOrigin: '50% 50%'},'rotate')
			.to(iconRects[2],duration,{rotation: 225,transformOrigin: '50% 50%'},'rotate')
			.to(iconRects[1],duration,{scaleX: 0,transformOrigin: '50% 50%'},'rotate');

		nav.classList == navClass ? timeline.seek('-=0', false).reversed(!timeline.reversed()) : null;

		const navEvents = () => {
			timeline.reversed() ? timeline.play() : timeline.reverse();
      nav.classList.toggle( navClass );
      el.getAttribute( 'aria-expanded' ) === 'false' ? el.setAttribute('aria-expanded', 'true') : el.setAttribute('aria-expanded', 'false');
		};

		/// PRESS EVENT
		const pressEvent = new Hammer.Manager(el);
		const Press = new Hammer.Press({time: 0	});
		pressEvent.add(Press);
		pressEvent.on('press', (e) => navEvents());

		/// KEYBOARD EVENT
		document.addEventListener('keydown', (e) => el === document.activeElement && (e.code === 'Enter' || e.code === 'Space') ? navEvents() : null);

		/// SWIPE EVENT
		const recognizer = {
			recognizers: [
				[	Hammer.Swipe,{direction: Hammer.DIRECTION_HORIZONTAL}	]
			]
		};

		let deltaX = 0;
		const swipeEvent = new Hammer.Manager(nav, recognizer);
		const Swipe = new Hammer.Swipe();
		swipeEvent.add(Swipe);

		swipeEvent.on('swipe', (e) => {
			deltaX = deltaX + e.deltaX;
			e.offsetDirection === 2 ? navEvents() : null;
		});

		const links = nav.querySelectorAll('a');
		const body = document.querySelector('body');
		const sizeMediaQueries = window.getComputedStyle(body, ':before').getPropertyValue('content').split('"').join('');
    const mq = window.matchMedia(sizeMediaQueries);
		// const desktop = exportedVars.breakpointDesktop;
		// const mq = window.matchMedia(
		// 	desktop !== undefined ? desktop.split('"').join('') : null
		// );

		links.forEach((elems, i) => {
			////// smoothScroll when desktop
			////// close menu when mobile
			elems.addEventListener('click', (e) => {
				if (mq.matches) {
					e.preventDefault();
					gsap.to(window, {	duration: duration,scrollTo: elems.getAttribute('href'),	ease: Quad	});
				} else {
					navEvents();
				}
			});

			/// SWIPE EVENT
			const swipeLinks = new Hammer.Manager(elems, recognizer);
			swipeLinks.on('swipe', (e) => {
				e.srcEvent.preventDefault();
				return false;
			});

			/// KEYBOARD EVENT

			document.addEventListener('keydown', (e) => {
				if (elems === document.activeElement) {
					if (e.code === 'Escape') {
						navEvents();
						el.focus();
					}
					e.code === 'Space' ? e.preventDefault() : null;
				}
			});
		});
	});
}
