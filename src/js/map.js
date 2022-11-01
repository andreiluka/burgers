;(function() {
   ymaps.ready(init);

   let placemarks = [{
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

   let geoObjects = [];

   function init() {
      let map = new ymaps.Map('map_9', {
         center: [59.94, 30.32],
         zoom: 12,
         controls: ['zoomControl'],
         behaviors: ['drag']
      });

      for (let i = 0; i < placemarks.length; i++) {

         geoObjects[i] = new ymaps.Placemark([placemarks[i].latitude, placemarks[i].longitude], {
            hintContent: placemarks[i].hintContent,
            balloonContent: placemarks[i].balloonContent.join('')
         }, {
            iconLayout: 'default#image',
            iconImageHref: 'img/map-marker.png',
            iconImageSize: [46, 57],
            iconImageOffset: [-23, -57]
         });
      }

      let clusterer = new ymaps.Clusterer({
         clusterIcons: [{
            href: 'img/dark-burger.png',
            size: [50, 40],
            offset: [-25, -20]
         }],
         clusterIconContentLayout: null
      });

      map.geoObjects.add(clusterer);
      clusterer.add(geoObjects);
   }

})()