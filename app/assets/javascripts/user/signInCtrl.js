(function() {
  'use strict';
  angular
    .module('venity')
    .controller('SignInCtrl', SignInCtrl);

    SignInCtrl.$inject = ['Auth', '$state'];

    function SignInCtrl(Auth, $state) {
      var vm = this;
      vm.signIn = signIn;

      function signIn() {
        Auth.login({email: vm.email, password: vm.password})
          .then(redirectToHome, displayErrors);

        function redirectToHome() {
          $state.go('main.home', {}, {reload: true});
        }

        function displayErrors(error) {
          vm.errors = error.data.error;
        }
      }
    }
})();
