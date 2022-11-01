;(function() {
   const menuAccordeon = document.querySelector('.menu-accordeon');
   const menuAccordeonLinks = document.querySelectorAll('.menu-accordeon__link')
   
   accordeonMenu();
   
   function accordeonMenu() {
      let currentActive;
   
      for (let menuAccordeonLink of menuAccordeonLinks) {
         menuAccordeonLink.addEventListener('click', function (e) {
            e.preventDefault();
   
            if (menuAccordeonLink.parentNode.classList.contains('menu-accordeon__item--active')) {
               menuAccordeonLink.parentNode.classList.remove('menu-accordeon__item--active');
   
            } else {
               if (currentActive) {
                  currentActive.classList.remove('menu-accordeon__item--active');
               }
   
               currentActive = menuAccordeonLink.parentNode;
               menuAccordeonLink.parentNode.classList.toggle('menu-accordeon__item--active');
            }
         });
      }
   }
})()