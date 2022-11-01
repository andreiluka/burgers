;(function() {
   const formOrder = document.querySelector('.form__tag');
   const formBtnSubmit = document.querySelector('.form__btn-submit');
   const formNotification = document.querySelector('.form-notification');
   const formNotificationText = document.querySelector('.form-notification__text');

   formBtnSubmit.addEventListener('click', function (e) {
      e.preventDefault();

      if (validateForm(formOrder)) {
         const formData = {
            name: formOrder.elements.name.value,
            phone: formOrder.elements.phone.value,
            comment: formOrder.elements.comment.value,
            to: 'qwer@mail.ru'
         }

         const xhr = new XMLHttpRequest();
         xhr.responseType = 'json';
         xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
         xhr.setRequestHeader('content-type', 'application/json');
         xhr.send(JSON.stringify(formData));

         xhr.addEventListener('load', function () {
            formNotificationText.textContent = xhr.response.message;
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

      elementForm.addEventListener('focus', function () {
         elementForm.classList.remove('form__block-input--error');
      });
   }


   const formNotificationBtn = document.querySelector('.form-notification__btn');

   formNotificationBtn.addEventListener('click', function (e) {
      e.preventDefault();

      formNotification.style.display = 'none';
   });
})()