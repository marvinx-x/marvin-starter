require('webpack-icons-installer/font-awesome'); //load only font-awesome icons
require('webpack-icons-installer/google');  //load only google material-design-icons
require( 'webpack-icons-installer/bootstrap' );

function resize() {
  let resizeTimer;
  window.addEventListener( 'resize', () => {
    document.body.classList.add( 'resize-animation-stopper' );
    clearTimeout( resizeTimer );
    resizeTimer = setTimeout( () => {
      document.body.classList.remove( 'resize-animation-stopper' );
    }, 100 );
  } );
}

function requireAll(r) {
  r.keys().forEach(r);
}

export function utils() {
  resize();
  requireAll(require.context('../icons/', true, /\.svg$/));
}



