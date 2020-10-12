// nav-fullscreen

var navFullscreen = document.querySelector('.nav-fullscreen');

function navFullscreenAdd() {
   navFullscreen.classList.add('nav-fullscreen--active');
};

function navFullscreenRemove() {
   navFullscreen.classList.remove('nav-fullscreen--active');
}


var hamburgerMenu = document.querySelector('.hamburger-menu');
hamburgerMenu.addEventListener('click', navFullscreenAdd);

var navFullscreenCross = document.querySelector('.nav-fullscreen__cross');
navFullscreenCross.addEventListener('click', navFullscreenRemove);


var navLinkBest = document.querySelector('#link-best');
navLinkBest.addEventListener('click', navFullscreenRemove);

var navLinkProduct = document.querySelector('#link-product');
navLinkProduct.addEventListener('click', navFullscreenRemove);

var navLinkTeam = document.querySelector('#link-team');
navLinkTeam.addEventListener('click', navFullscreenRemove);

var navLinkMenu = document.querySelector('#link-menu');
navLinkMenu.addEventListener('click', navFullscreenRemove);

var navLinkReviews = document.querySelector('#link-reviews');
navLinkReviews.addEventListener('click', navFullscreenRemove);

var navLinkHow = document.querySelector('#link-how');
navLinkHow.addEventListener('click', navFullscreenRemove);

var navLinkMap = document.querySelector('#link-map');
navLinkMap.addEventListener('click', navFullscreenRemove);



// var navLink = document.querySelector('nav__link');

// navLink.addEventListener('click', function () {
//    navFullscreen.classList.remove('nav-fullscreen--active');
// });

// var navI = document.querySelector('#nav__i');

// navI.addEventListener('click', function (e) {
//    if (e.target && e.target.matches('a.nav__link')) {
//       // console.log('работает');
//       navFullscreenRemove();
//    }
// });


// menu-accordeon

var i = 0;

function itemActiveRemove() {
   accoItemMeat.classList.remove('menu-accordeon__item--active');
   accoItemVegan.classList.remove('menu-accordeon__item--active');
   accoItemDiet.classList.remove('menu-accordeon__item--active');
   i = 0;
}

var accoItemMeat = document.querySelector('#accoItemMeat');
var accoLinkMeat = document.querySelector('.menu-accordeon__link--meat-eater');

document.getElementsByClassName('menu-accordeon__link--meat-eater')[0].onclick = function () {
   return ++i;
   // console.log(++i);
}

accoLinkMeat.addEventListener('click', function (e) {
   e.preventDefault();

   if (i < 2) {
      accoItemMeat.classList.add('menu-accordeon__item--active');
   } else {
      itemActiveRemove();
   }
});


var accoItemVegan = document.querySelector('#accoItemVegan');
var accoLinkVegan = document.querySelector('.menu-accordeon__link--vegetarian');

document.getElementsByClassName('menu-accordeon__link--vegetarian')[0].onclick = function () {
   return ++i;
   // console.log(++i);
}

accoLinkVegan.addEventListener('click', function (e) {
   e.preventDefault();

   if (i < 2) {
      accoItemVegan.classList.add('menu-accordeon__item--active');
   } else {
      itemActiveRemove();
   }
});


var accoItemDiet = document.querySelector('#accoItemDiet');
var accoLinkDiet = document.querySelector('.menu-accordeon__link--dietary');

document.getElementsByClassName('menu-accordeon__link--dietary')[0].onclick = function () {
   return ++i;
   // console.log(++i);
}

accoLinkDiet.addEventListener('click', function (e) {
   e.preventDefault();

   if (i < 2) {
      accoItemDiet.classList.add('menu-accordeon__item--active');
   } else {
      itemActiveRemove();
   }
});




// pagination

var pageItem = document.querySelector('.pagination__item');
var pageLink = document.querySelector('#page');

pageLink.addEventListener('click', function () {
   console.log('go');
   pageItem.classList.add('pagination__item--active');
});