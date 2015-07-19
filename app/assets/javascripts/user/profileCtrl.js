(function() {
  'use strict';
  angular
    .module('venity')
    .controller('ProfileCtrl', ProfileCtrl);

    ProfileCtrl.$inject = ['AuthFactory', 'profile', 'MyProfileFactory'];

    function ProfileCtrl(AuthFactory, profile, MyProfileFactory) {
      var vm = this;
      vm.authFactory = AuthFactory;
      vm.getErrors = AuthFactory.getErrors;
      vm.signIn = AuthFactory.signIn;
      vm.profile = profile.data.profile;
      vm.update = update;
      vm.errors = '';

      AuthFactory.clearErrors();

      function update() {
        MyProfileFactory.update(vm.profile)
          .error(function(error) {
            vm.errors = error.errors;
          })
      }
    }
})();
