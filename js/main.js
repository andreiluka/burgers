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

accordeonMenu();

function accordeonMenu() {
   let currentActive;

   menuAccordeon.addEventListener('click', function(e) {
      e.preventDefault();

      if (e.target.classList.contains('menu-accordeon__link') 
      && e.target.parentNode.classList.contains('menu-accordeon__item--active')) {

         e.target.parentNode.classList.remove('menu-accordeon__item--active');

      } else {
         if (e.target.classList.contains('menu-accordeon__link')) {
            if (currentActive) {
               currentActive.classList.remove('menu-accordeon__item--active');
            }
   
            currentActive = e.target.parentNode;
            e.target.parentNode.classList.toggle('menu-accordeon__item--active');
         }
      }

   });
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





// pagination

const pageList = document.querySelectorAll('.pagination__item');
// var pageLink = document.querySelector('#page');

for (const pageItem of pageList) {

   pageItem.addEventListener('click', function () {
      pageItem.classList.add('pagination__item--active');
   });
}



// const teamList = document.querySelector('.team__list');

// accordeonTeam();

// function accordeonTeam() {
//    let teamMemberFirstActive = document.querySelector('.team-member');
//    teamMemberFirstActive.classList.add('team-member--active');
   
//    let lastActive = teamMemberFirstActive;

//    teamList.addEventListener('click', function(e) {
//       if (e.target.classList.contains('team-member__name')) {
//          if (lastActive) {
//             lastActive.classList.remove('team-member--active');
//          }

//          lastActive = e.target.parentNode;
//          e.target.parentNode.classList.toggle('team-member--active');
//       }
//    });
// }
