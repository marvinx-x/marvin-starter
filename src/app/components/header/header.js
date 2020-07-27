import { gsap, TimelineLite, TweenLite, Circ } from 'gsap/all';
import { isMobile } from 'mobile-device-detect';

export function logo() {
	const logo = document.querySelectorAll( '.logo' );

	logo.forEach( ( el, i ) => {
		const iconLogo = el.firstElementChild;
		const iconBackLogo = el.lastElementChild;
		const duration = 1.5;
		gsap.set( iconBackLogo, { rotationY: 180 } )

		const timeline = new TimelineLite({
			paused: true,
			reversed: true,
			ease : Circ.easeInOut
		})
			.to( iconLogo, duration, { rotationY: 360 }, 'rotate' )
			.to( iconBackLogo, duration, { rotationY: -180 }, 'rotate' )

		if ( !isMobile ){
			el.addEventListener( 'mouseenter', ( e ) => timeline.reversed() ? timeline.play() : null);
			el.addEventListener( 'mouseleave', ( e ) => {
				TweenLite.delayedCall(.3, function(){
					timeline.reverse();
			 });
			});
		}
		else{
			const tapEvent = new Hammer.Manager(el);
			const Tap = new Hammer.Tap( {time : 250 } );
			tapEvent.add(Tap);
			tapEvent.on( 'tap', ( e ) => timeline.reversed() ? timeline.play() : timeline.reverse() );
		}
	});
}
