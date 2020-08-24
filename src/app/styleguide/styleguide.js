'use strict';

// require( 'webpack-icons-installer' ); //load ALL icons
// require('webpack-icons-installer/font-awesome'); //load only font-awesome icons
// require('webpack-icons-installer/google');  //load only google material-design-icons
// require( 'webpack-icons-installer/bootstrap' );

import './styleguide.scss';
import { utils } from '../assets/scripts/utils';
import { navigation } from '../components/nav/nav';
import { logo } from '../components/header/header';

utils();
navigation();
logo();
