require( 'webpack-icons-installer' );

import './styleguide.scss';
import {
  navigation
} from '../components/nav/nav';
import {
  logo
} from '../components/header/header';

navigation();
logo();

// import responsiveImageJpg from '../assets/images/image.jpg?sizes[]=320,sizes[]=1120,sizes[]=1920';
// import responsiveImagePng from 'img/myImage.jpg?sizes[]=320,sizes[]=1120,sizes[]=1920';
// console.log(responsiveImageJpg);
