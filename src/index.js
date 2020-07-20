import './assets/styles/styles.scss';

const buttonNav = document.getElementById('button-nav');
const nav = document.querySelector( 'nav[role=navigation]' );

buttonNav.addEventListener( 'click', () => {
  nav.classList.toggle('open');
})


