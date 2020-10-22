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





// team-member

function teamMemberActiveRemove() {
   teamMemberDaniel.classList.remove('team-member--active');
   teamMemberRichard.classList.remove('team-member--active');
   teamMemberJake.classList.remove('team-member--active');
   teamMemberNikolay.classList.remove('team-member--active');
}


var teamMemberDaniel = document.querySelector('#daniel');

teamMemberDaniel.addEventListener('click', function (e) {
   teamMemberActiveRemove();
   teamMemberDaniel.classList.add('team-member--active');
});

var teamMemberRichard = document.querySelector('#richard');

teamMemberRichard.addEventListener('click', function (e) {
   teamMemberActiveRemove();
   teamMemberRichard.classList.add('team-member--active');
});

var teamMemberJake = document.querySelector('#jake');

teamMemberJake.addEventListener('click', function (e) {
   teamMemberActiveRemove();
   teamMemberJake.classList.add('team-member--active');
});

var teamMemberNikolay = document.querySelector('#nikolay');

teamMemberNikolay.addEventListener('click', function (e) {
   teamMemberActiveRemove();
   teamMemberNikolay.classList.add('team-member--active');
});





// form

const formBtnSubmit = document.querySelector('.form__btn-submit');
const formNotification = document.querySelector('.form-notification');

formBtnSubmit.addEventListener('click', function(e) {
   e.preventDefault();

   

   formNotification.style.display = 'flex';
});




const formNotificationBtn = document.querySelector('.form-notification__btn');

formNotificationBtn.addEventListener('click', function(e) {
   e.preventDefault();

   formNotification.style.display = 'none';
});







// pagination

var pageItem = document.querySelector('.pagination__item');
var pageLink = document.querySelector('#page');

pageLink.addEventListener('click', function () {
   console.log('go');
   pageItem.classList.add('pagination__item--active');
});