let player;

/// Запуск плеера

function onYouTubeIframeAPIReady() {
   player = new YT.Player('yt-player', {
      height: '100%',
      width: '100%',
      videoId: 'zmg_jOwa9Fc',
      playerVars: {
         autoplay: 0,
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

   switch (event.data) {
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
   } else {
      player.playVideo();
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
   const {
      button,
      range
   } = coordsPlay;
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
   const {
      button,
      range
   } = coordsVolume;
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
});