// nav-fullscreen

var navFullscreen = document.querySelector('.nav-fullscreen');


var hamburgerMenu = document.querySelector('.hamburger-menu');
hamburgerMenu.addEventListener('click', function() {
   navFullscreen.classList.add('nav-fullscreen--active');
});

const navVertical = document.querySelector('.nav--vertical');
navVertical.addEventListener('click', function(e) {

   if (e.target.classList.contains('nav__link')) {
      navFullscreen.classList.remove('nav-fullscreen--active');
   }
});

var navFullscreenCross = document.querySelector('.nav-fullscreen__cross');
navFullscreenCross.addEventListener('click', function() {
   navFullscreen.classList.remove('nav-fullscreen--active');
});




// menu-accordeon

const menuAccordeon = document.querySelector('.menu-accordeon');

const menuAccordeonLinks = document.querySelectorAll('.menu-accordeon__link')

accordeonMenu();

function accordeonMenu() {
   let currentActive;

   for (let menuAccordeonLink of menuAccordeonLinks) {

      menuAccordeonLink.addEventListener('click', function(e) {
         e.preventDefault();
   
         if (menuAccordeonLink.parentNode.classList.contains('menu-accordeon__item--active')) {
   
            menuAccordeonLink.parentNode.classList.remove('menu-accordeon__item--active');
   
         } else {
            
            if (menuAccordeonLink.classList.contains('menu-accordeon__link')) {
   
               if (currentActive) {
                  currentActive.classList.remove('menu-accordeon__item--active');
               }
            }
   
            currentActive = menuAccordeonLink.parentNode;
            menuAccordeonLink.parentNode.classList.toggle('menu-accordeon__item--active');
         }
      });
   }
}




// team-member

const teamList = document.querySelector('.team__list');

accordeonTeam();

function accordeonTeam() {
   let teamMemberFirstActive = document.querySelector('.team-member');
   teamMemberFirstActive.classList.add('team-member--active');
   
   let lastActive = teamMemberFirstActive;

   teamList.addEventListener('click', function(e) {
      if (e.target.classList.contains('team-member__name')) {
         if (lastActive) {
            lastActive.classList.remove('team-member--active');
         }

         lastActive = e.target.parentNode;
         e.target.parentNode.classList.toggle('team-member--active');
      }
   });
}



// products

$(document).ready(function () {

   var slider = $('.products__list').bxSlider({
      controls: false,
      pager: false,
      slideMargin: 50
   });

   $('.products-slider__arrow-left').on('click', function (e) {
      e.preventDefault();

      slider.goToPrevSlide();
   });

   $('.products-slider__arrow-right').on('click', function (e) {
      e.preventDefault();

      slider.goToNextSlide();
   });
});




// form

const formOrder = document.querySelector('.form__tag');
const formBtnSubmit = document.querySelector('.form__btn-submit');
const formNotification = document.querySelector('.form-notification');
const formNotificationText = document.querySelector('.form-notification__text');

formBtnSubmit.addEventListener('click', function(e) {
   e.preventDefault();

   if (validateForm(formOrder)) {
      const formData = {
         name: formOrder.elements.name.value,
         phone: formOrder.elements.phone.value,
         comment: formOrder.elements.comment.value
      }

      const xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.send(JSON.stringify(formData));
      xhr.addEventListener('load', function() {
         if (xhr.response.status) {
            formNotificationText.textContent = 'Сообщение отправлено';
         } else {
            formNotificationText.textContent = 'Сообщение не отправлено, повторите попытку позже';
         }
      });
      formNotification.style.display = 'flex';
      formOrder.reset();
   }
});

function validateForm(form) {
   let valid = true;

   if (!validateField(form.elements.name)) {
      valid = false;
   }

   if (!validateField(form.elements.phone)) {
      valid = false;
   }

   if (!validateField(form.elements.comment)) {
      valid = false;
   }

   return valid;
}

function validateField(field) {
   if (!field.checkValidity()) {
      field.classList.add('form__block-input--error');

      return false;
   } else {
      return true;
   }
}

for (let i = 0; i < formOrder.length; i++) {
   const elementForm = formOrder[i];

   elementForm.addEventListener('focus', function() {
      elementForm.classList.remove('form__block-input--error');
   });
}


const formNotificationBtn = document.querySelector('.form-notification__btn');

formNotificationBtn.addEventListener('click', function(e) {
   e.preventDefault();

   formNotification.style.display = 'none';
});




// OnePageScroll

$(document).ready(function() {

   function coloringDots(index) {
      $('.wrapper')
         .find('.pagination__item')
         .eq(index)
         .addClass('pagination__item--active')
         .siblings()
         .removeClass('pagination__item--active');
   };

   function generateDots() {
      $('.section').each(function () {
         var dotPagination = $('<li>', {
            attr: {
               class: 'pagination__item'
            },
            html: '<div class="pagination__numb"></div>'
         });

         $('.pagination__list').append(dotPagination);
      });
      
      $('.pagination__item').first().addClass('pagination__item--active');
   };

   generateDots();

   $('body').on('click', '.pagination__item', function () {
      var $this = $(this),
         container = $this.closest('.wrapper'),
         index = $this.index();

      moveSlide(container, index);
      coloringDots(index);
   });

   $('.nav__link, .button').on('click', function () {
      const $this = $(this),
         activeSection = $($this.attr('href')),
         index = activeSection.index('.section');

      activeSection
         .addClass('section__active')
         .siblings()
         .removeClass('section__active');
         
      console.log(activeSection);
      console.log(index);
      coloringDots(index);
   });
   
   function moveSlide(container, sectionNum) {

      var timeNow = new Date().getTime(),
         sections = container.find('.section'),
         activeSection = sections.filter('.section__active'),
         reqItem = sections.eq(sectionNum),
         reqIndex = reqItem.index(),
         list = container.find('.sections-list'),
         duration = 700,
         settings = $.extend({}),
         lastAnimation = 0;

      if (reqItem.length) {
         if(timeNow - lastAnimation < duration + settings.animationTime) {
            e.preventDefault();
            return;
         } else {
            list.animate({
               'top': -reqIndex * 100 + '%'
            }, duration, function () {
               activeSection.removeClass('section__active');
               reqItem.addClass('section__active');
               coloringDots(sectionNum);
            });
            lastAnimation = timeNow;
         }
      }
   };
      
   $('.wrapper').on('wheel', function (e) {
      e.preventDefault();

      // e = e || window.event;
      var delta = e.originalEvent.deltaY,
         container = $('.wrapper'),  // возможно нужно вставить еще обертку, либо вешать колесо на body
         sections = container.find('.section'),
         activeItem = sections.filter('.section__active'),
         existedItem, edgeItem, reqItem;

      if (delta >= 100) {
         existedItem = activeItem.next();
         edgeItem = sections.first();
      }

      if (delta <= -100) {
         existedItem = activeItem.prev();
         edgeItem = sections.last();
      }

      reqItem = existedItem.length ? existedItem.index() : edgeItem.index();
      moveSlide(container, reqItem);
      console.log(delta);
   });
});