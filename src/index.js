'use strict';

import './app/assets/styles/styles.scss';

import { navigation } from './app/components/nav/nav';
import { utils } from './app/assets/scripts/utils';
import { logo } from './app/components/header/header';
import { Colors } from './app/assets/scripts/colors';

window.addEventListener('load',() => {
  utils();
  logo();
  navigation();
  new Colors();
})

