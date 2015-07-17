(function() {
  'use strict';
  angular
    .module('venity')
    .controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['Auth', 'currentUser', 'AuthFactory', '$stateParams'];

    function MainCtrl(Auth, currentUser, AuthFactory, $stateParams) {
      var vm = this;
      vm.signOut = AuthFactory.signOut;
      vm.isAuthenticated = Auth.isAuthenticated();
      vm.currentUser = currentUser;
    }
})();
