;(function() {
   $(document).ready(function () {
      let slider = $('.products__list').bxSlider({
         controls: false,
         pager: false,
         slideMargin: 50,
         swipeThreshold: 200
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
})()