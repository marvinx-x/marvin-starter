require('webpack-icons-installer/font-awesome'); //load only font-awesome icons
require('webpack-icons-installer/google');  //load only google material-design-icons
require( 'webpack-icons-installer/bootstrap' );
require( 'van11y-accessible-simple-tooltip-aria/src/van11y-accessible-simple-tooltip-aria.es6' );


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


function inputFile() {
  var inputs = document.querySelectorAll( '.input-file' );
	Array.prototype.forEach.call( inputs, function( input )
	{
		var label	 = input.nextElementSibling,
			labelVal = label.innerHTML;

		input.addEventListener( 'change', function( e )
		{
			var fileName = '';
			if( this.files && this.files.length > 1 )
				fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
			else
				fileName = e.target.value.split( '\\' ).pop();

			if( fileName )
				label.querySelector( 'span' ).innerHTML = fileName;
			else
				label.innerHTML = labelVal;
		});

		// Firefox bug fix
		input.addEventListener( 'focus', function(){ input.classList.add( 'has-focus' ); });
		input.addEventListener( 'blur', function(){ input.classList.remove( 'has-focus' ); });
	});
}


export function utils() {
  resize();
  requireAll( require.context( '../icons/', true, /\.svg$/ ) );
  inputFile();
}





