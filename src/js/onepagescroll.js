;(function() {
   $(document).ready(function () {

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
            let dotPagination = $('<li>', {
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
         let $this = $(this),
            container = $this.closest('.wrapper'),
            index = $this.index();
   
         moveSection(container, index);
         coloringDots(index);
      });
   
      $('.nav__link, .button').on('click', function () {
         const $this = $(this),
            activeSection = $($this.attr('href')),
            index = activeSection.index('.section');
   
         activeSection
            .addClass('section__active')
            .siblings()
            .removeClass('section__active');
         coloringDots(index);
      });
   
      function moveSection(container, sectionNum) {
   
         let timeNow = new Date().getTime(),
            sections = container.find('.section'),
            activeSection = sections.filter('.section__active'),
            reqItem = sections.eq(sectionNum),
            reqIndex = reqItem.index(),
            list = container.find('.sections-list'),
            duration = 200,
            settings = $.extend({}),
            lastAnimation = 0;
   
         if (reqItem.length) {
            if (timeNow - lastAnimation < duration + settings.animationTime) {
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
   
            let delta = e.originalEvent.deltaY,
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
         },
   
         touchmove: e => e.preventDefault()
      });
   
   
      // Управление клавишами
   
      $(document).on('keydown', function (e) {
         let container = $('.wrapper'),
            sections = container.find('.section'),
            activeItem = sections.filter('.section__active');
   
         switch (e.keyCode) {
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
   
            swipe: function (event, direction, distance) {
   
               let container = $('.wrapper'),
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

})()