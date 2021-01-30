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





// player

let player;

/// Запуск плеера

function onYouTubeIframeAPIReady() {
   player = new YT.Player('yt-player', {
      height: '100%',          // по макету 405
      width: '100%',           // по макету 640
      videoId: 'zmg_jOwa9Fc',
      playerVars: {
         autoplay:0,
         controls: 0,
         disablekb: 0,
         modestbranding: 0,
         rel: 0,
         showinfo: 0
      },
      events: {
         'onReady': onPlayerReady,
         'onStateChange': onPlayerStateChange
      }
   });
}

/// действия при проигровании видео

function onPlayerStateChange(event) {
   const playerButton = $('.player__start');

   switch(event.data) {
      case 1:
         $('.player__wrapper').addClass('player__wrapper--active');
         playerButton.addClass('paused');
         break;
      case 2:
         playerButton.removeClass('paused');
         break;
   }
}

/// действия после запуска плеера

function onPlayerReady() {
   const durationSeconds = player.getDuration();
   
   let interval;
   clearInterval(interval);
   
   interval = setInterval(() => {
      const compleatedSeconds = player.getCurrentTime();
      const percent = (compleatedSeconds / durationSeconds) * 100;

      $('.player__playback-button').css({
         left: `${percent}%`
      });

      $('.player__duration-completed').text(formatTime(compleatedSeconds));
   }, 1000);

   $('.player__duration-estimate').text(formatTime(durationSeconds));
}

/// перевод секунд в минуты:секуны

function formatTime(time) {
   const roundTime = Math.round(time);

   const minutes = Math.floor(roundTime / 60);
   const seconds = roundTime - minutes * 60;

   const formatSeconds = seconds < 10 ? `0${seconds}` : seconds;

   return `${minutes}:${formatSeconds}`;
}

/// действия по нажатию кнопки play

$('.player__start').on('click', e => {
   const btn = $(e.currentTarget);

   if (btn.hasClass('paused')) {
      player.pauseVideo();
      // btn.removeClass('paused');
   } else {
      player.playVideo();
      // btn.addClass('paused');
   }
});

/// перемотка видео

const playerPlayback = document.querySelector('.player__playback');
const playerPlaybackButton = document.querySelector('.player__playback-button');

let coordsPlay = {};

function determPlay(elem, event) {
   const determ = elem.getBoundingClientRect();

   return {
      offsetLeft: determ.left,
      width: determ.width,
      clickedX: event.layerX
   }
}

function dragPlay(e) {
   const {button, range} = coordsPlay;
   button.x = e.pageX - range.offsetLeft - (button.width / 2);

   if (button.x < 0) button.x = 0;
   if (button.x > range.width - button.width) {
      button.x = range.width - button.width;
   }

   playerPlaybackButton.style.left = `${button.x}px`;

   const clickedPercent = (button.x / (range.width - button.width)) * 100;
   const newPlayerTime = (player.getDuration() / 100) * clickedPercent;

   player.seekTo(newPlayerTime);
}

playerPlaybackButton.addEventListener('mousedown', e => {
   playerCustom.classList.add('drag-play');

   coordsPlay.range = determPlay(playerPlayback, e);
   coordsPlay.button = determPlay(playerPlaybackButton, e);
});

document.addEventListener('mousemove', e => {
   if (!playerCustom.classList.contains('drag-play')) return;

   dragPlay(e);
});

document.addEventListener('mouseup', e => {
   playerCustom.classList.remove('drag-play');
});

playerPlayback.addEventListener('click', e => {
   coordsPlay.range = determPlay(playerPlayback, e);
   coordsPlay.button = determPlay(playerPlaybackButton, e);

   dragPlay(e);
});


// $('.player__playback').on('click', e => {
//    e.preventDefault();

//    const bar = $(e.currentTarget);
//    const newButtonPosition = e.pageX - bar.offset().left;
//    const clickedPercent = (newButtonPosition / bar.width()) * 100;
//    const newPlayerTime = (player.getDuration() / 100) * clickedPercent;

//    $('.player__playback-button').css({
//       left: `${clickedPercent}%`
//    });

//    player.seekTo(newPlayerTime);
// });



/// громкость 

const playerCustom = document.querySelector('.player');
const playerVolume = document.querySelector('.player__volume');
const volumeBlock = document.querySelector('.player__volume-block');
const volumeRange = document.querySelector('.player__volume-range');
const volumeButton = document.querySelector('.player__volume-button');
const volumePic = document.querySelector('.player__volume-pic');

let coordsVolume = {};

function determVolume(elem, event) {
   const determ = elem.getBoundingClientRect();

   return {
      offsetTop: determ.top,
      height: determ.height,
      clickedY: event.layerY
   }
}

function dragVolume(e) {
   const {button, range} = coordsVolume;
   button.y = e.pageY - range.offsetTop - (button.height / 2);

   if (button.y < 0) button.y = 0;
   if (button.y > range.height - button.height) {
      button.y = range.height - button.height;
   }

   volumeButton.style.top = `${button.y}px`;

   const newPlayerVolume = 100 - (button.y / (range.height - button.height)) * 100;
   player.setVolume(newPlayerVolume);
      
   if (newPlayerVolume == 0) {
      playerVolume.classList.add('mute');
      player.mute();
   } else {
      playerVolume.classList.remove('mute');
      player.unMute();
   }
}

volumeButton.addEventListener('mousedown', e => {
   playerCustom.classList.add('drag-volume');
   volumeBlock.style.display = 'block';

   coordsVolume.range = determVolume(volumeRange, e);
   coordsVolume.button = determVolume(volumeButton, e);
});

playerCustom.addEventListener('mousemove', e => {
   if (!playerCustom.classList.contains('drag-volume')) return;

   dragVolume(e);
});

document.addEventListener('mouseup', e => {
   playerCustom.classList.remove('drag-volume');
   volumeBlock.style.display = 'none';
});

volumeRange.addEventListener('click', e => {
   coordsVolume.range = determVolume(volumeRange, e);
   coordsVolume.button = determVolume(volumeButton, e);

   dragVolume(e);
});

volumePic.addEventListener('click', e => {
   
   if (playerVolume.classList.contains('mute')) {
      playerVolume.classList.remove('mute');
      player.unMute();
      
   } else {
      playerVolume.classList.add('mute');
      player.mute();
   }
});



/// заставка к видео

$('.player__splash').on('click', e => {
   player.playVideo();
   // $('player__wrapper').removeClass('player__wrapper--active');
})





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





// Yandex.Map

ymaps.ready(init);

var placemarks = [
   {
      latitude: 59.97,
      longitude: 30.31,
      hintContent: '<div class="map__hint">ул. Литераторов, д.19</div>',
      balloonContent: [
         '<div class="map__balloon">',
         'Работаем с 10:00 до 19:00, без выходных. ',
         'Вход со двора',
         '</div>'
      ]
   },
   {
      latitude: 59.94,
      longitude: 30.25,
      hintContent: '<div class="map__hint">Малый проспект В.О., д.64</div>',
      balloonContent: [
         '<div class="map__balloon">',
         'Работаем с 11:00 до 20:00, без выходных. ',
         'Удобная парковка',
         '</div>'
      ]
   },
   {
      latitude: 59.93,
      longitude: 30.34,
      hintContent: '<div class="map__hint">наб. реки Фонтанки, д.56</div>',
      balloonContent: [
         '<div class="map__balloon">',
         'Работаем с 12:00 до 23:00, без выходных. ',
         'Приходите, будем рады!',
         '</div>'
      ]
   }
]

// var geoObjects = [];

function init() {
   var map = new ymaps.Map('map_9', {
      center: [59.94, 30.32],
      zoom: 12,
      controls: ['zoomControl'],
      behaviors: ['drag']
   });

   placemarks.forEach(function(obj){
      var placemark = new ymaps.Placemark([obj.latitude, obj.longitude], {
         hintContent: obj.hintContent,
         balloonContent: obj.balloonContent.join('')
      }, 
      {
         iconLayout: 'default#image',
         iconImageHref: '../img/map-marker.png',
         iconImageSize: [46, 57],
         iconImageOffset: [-23, -57]
      });

      map.geoObjects.add(placemark);
   });

   // for (var i = 0; i < placemarks.length; i++) { 
      
   //    geoObjects[i] = new ymaps.Placemark([placemarks[i].latitude, placemarks[i].longitude], {
   //       hintContent: placemarks[i].hintContent,
   //       balloonContent: placemarks[i].balloonContent.join('')
   //    }, 
   //    {
   //       iconLayout: 'default#image',
   //       iconImageHref: '../img/map-marker.png',
   //       iconImageSize: [46, 57],
   //       iconImageOffset: [-23, -57]
   //    });
   // }

   // var clusterer = new ymaps.Clusterer({
   //    clusterIcons: [
   //       {
   //          href: '../img/dark-burger.png',
   //          size: [50, 40],
   //          offset: [-25, -20]
   //       }
   //    ],
   //    clusterIconContentLayout: null
   // });
   

   // map.geoObjects.add(clusterer);
   // clusterer.add(geoObjects);
}




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

      moveSection(container, index);
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
         
      // console.log(activeSection);
      // console.log(index);
      coloringDots(index);
   });
   
   function moveSection(container, sectionNum) {

      var timeNow = new Date().getTime(),
         sections = container.find('.section'),
         activeSection = sections.filter('.section__active'),
         reqItem = sections.eq(sectionNum),
         reqIndex = reqItem.index(),
         list = container.find('.sections-list'),
         duration = 200,
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
      
   $('.wrapper').on({
      wheel: function (e) {
      e.preventDefault();

      var delta = e.originalEvent.deltaY,
         container = $('.wrapper'),
         sections = container.find('.section'),
         activeItem = sections.filter('.section__active'),
         existedItem, edgeItem, reqItem;

      if (delta > 0) {
         existedItem = activeItem.next();
         edgeItem = sections.first();
      }
      
      if (delta < 0) {
         existedItem = activeItem.prev();
         edgeItem = sections.last();
      }
      
      reqItem = existedItem.length ? existedItem.index() : edgeItem.index();
      moveSection(container, reqItem);
      // console.log(delta);
      },

      touchmove: e => e.preventDefault()
   });


   // Управление клавишами

   $(document).on('keydown', function (e) {
      var container = $('.wrapper'),
         sections = container.find('.section'),
         activeItem = sections.filter('.section__active');

      switch(e.keyCode) {
         case 40:
            moveSection(container, activeItem.next().index());
            break;
         case 38:
            moveSection(container, activeItem.prev().index());
            break;
      }
   });



   // MobileDetect

   const md = new MobileDetect(window.navigator.userAgent);
   const isMobile = md.mobile();

   if (isMobile) {

      // TouchSwipe

      $('body').swipe({
         
         swipe:function(event, direction, distance) {
            // console.log('You swiped ' + direction + ' ' + distance);
   
            var container = $('.wrapper'),
               sections = container.find('.section'),
               activeItem = sections.filter('.section__active'),
               reqItem;
            
            if (direction == 'up') {
               reqItem = activeItem.next().index();
   
            } else if (direction == 'down') {
               reqItem = activeItem.prev().index();
            }
   
            moveSection(container, reqItem);
         },
   
         excludedElements: "label, button, input, select, textarea, .noSwipe"
      });
   }
});