import { gsap, TimelineLite, TweenLite, Circ } from 'gsap/all';

export function logo() {
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
