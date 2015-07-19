(function() {
  'use strict';
  angular
    .module('venity')
    .controller('ProfileCtrl', ProfileCtrl);

    ProfileCtrl.$inject = ['ProfileSrv'];

    function ProfileCtrl(ProfileSrv) {
      var vm = this;
      vm.update = update;

      ProfileSrv.getMy()
        .success(success).error(failure);

      function update() {
        ProfileSrv.update(vm.profile)
          .success(success).error(failure);
      }

      function success(data) {
        vm.profile = data.profile;
      }

      function failure(error) {
        vm.errors = error;
      }
    }
})();
