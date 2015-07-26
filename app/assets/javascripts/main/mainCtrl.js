(function() {
  'use strict';
  angular
    .module('venity')
    .controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['Auth', 'currentUser', '$state'];

    function MainCtrl(Auth, currentUser, $state) {
      var vm = this;
      vm.isAuthenticated = Auth.isAuthenticated();
      vm.currentUser = currentUser;
      vm.signOut = signOut;

      function signOut() {
        Auth.logout()
          .then(function() {
            $state.go('main.home', {}, { reload: true });
          });
      }
    }
})();
