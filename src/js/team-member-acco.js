;(function() {
   const teamList = document.querySelector('.team__list');

   accordeonTeam();

   function accordeonTeam() {
      let teamMemberFirstActive = document.querySelector('.team-member');
      teamMemberFirstActive.classList.add('team-member--active');

      let lastActive = teamMemberFirstActive;

      teamList.addEventListener('click', function (e) {
         if (e.target.classList.contains('team-member__name')) {

            if (lastActive) {
               lastActive.classList.remove('team-member--active');
            }

            lastActive = e.target.parentNode;
            e.target.parentNode.classList.toggle('team-member--active');
         }
      });
   }
})()