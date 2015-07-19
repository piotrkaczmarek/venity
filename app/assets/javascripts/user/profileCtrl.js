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
        .success(success)
        .error(displayErrors);

      function update() {
        ProfileSrv.update(vm.profile)
          .success(success)
          .error(displayErrors);
      }

      function success(data) {
        vm.profile = data.profile;
      }

      function displayErrors(error) {
        vm.errors = error;
      }
    }
})();
