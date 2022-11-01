;(function() {
   const navFullscreen = document.querySelector('.nav-fullscreen');
   const hamburgerMenu = document.querySelector('.hamburger-menu');
   const navVertical = document.querySelector('.nav--vertical');
   const navFullscreenCross = document.querySelector('.nav-fullscreen__cross');

   hamburgerMenu.addEventListener('click', function () {
      navFullscreen.classList.add('nav-fullscreen--active');
   });

   navVertical.addEventListener('click', function (e) {
      if (e.target.classList.contains('nav__link-fullscreen')) {
         navFullscreen.classList.remove('nav-fullscreen--active');
      }
   });

   navFullscreenCross.addEventListener('click', function () {
      navFullscreen.classList.remove('nav-fullscreen--active');
   });
})()