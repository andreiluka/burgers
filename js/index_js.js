// pagination

var pageItem = document.querySelector('.pagination__item');
var pageLink = document.querySelector('#page');

pageLink.addEventListener('click', function () {
   console.log('go');
   pageItem.classList.add('pagination__item--active');
});


// menu-accordeon

var accoItem = document.querySelector('.menu-accordeon__item');

var accoItemMeat = document.querySelector('#accoItemMeat');
var accoLinkMeat = document.querySelector('.menu-accordeon__link--meat-eater');

var i = 0;
document.getElementsByClassName('menu-accordeon__link--meat-eater')[0].onclick = function () {
   // return ++i;
   console.log(++i);
}

accoLinkMeat.addEventListener('click', function (e) {
   e.preventDefault();

   if (i < 2) {
      accoItemMeat.classList.add('menu-accordeon__item--active');
   } else {
      accoItemMeat.classList.remove('menu-accordeon__item--active');
      accoItemVegan.classList.remove('menu-accordeon__item--active');
      accoItemDiet.classList.remove('menu-accordeon__item--active');
      i = 0;
   }
});



var accoItemVegan = document.querySelector('#accoItemVegan');
var accoLinkVegan = document.querySelector('.menu-accordeon__link--vegetarian');

document.getElementsByClassName('menu-accordeon__link--vegetarian')[0].onclick = function () {
   // return ++i;
   console.log(++i);
}

accoLinkVegan.addEventListener('click', function (e) {
   e.preventDefault();

   if (i < 2) {
      accoItemVegan.classList.add('menu-accordeon__item--active');
   } else {
      accoItemVegan.classList.remove('menu-accordeon__item--active');
      accoItemMeat.classList.remove('menu-accordeon__item--active');
      accoItemDiet.classList.remove('menu-accordeon__item--active');
      i = 0;
   }
});



var accoItemDiet = document.querySelector('#accoItemDiet');
var accoLinkDiet = document.querySelector('.menu-accordeon__link--dietary');

document.getElementsByClassName('menu-accordeon__link--dietary')[0].onclick = function () {
   // return ++i;
   console.log(++i);
}

accoLinkDiet.addEventListener('click', function (e) {
   e.preventDefault();

   if (i < 2) {
      accoItemDiet.classList.add('menu-accordeon__item--active');
   } else {
      accoItemDiet.classList.remove('menu-accordeon__item--active');
      accoItemMeat.classList.remove('menu-accordeon__item--active');
      accoItemVegan.classList.remove('menu-accordeon__item--active');
      i = 0;
   }
});