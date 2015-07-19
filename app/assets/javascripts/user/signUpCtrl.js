(function() {
  'use strict';
  angular
    .module('venity')
    .controller('SignUpCtrl', SignUpCtrl);

    SignUpCtrl.$inject = ['Auth', '$state'];

    function SignUpCtrl(Auth, $state) {
      var vm = this;
      vm.signUp = signUp;

      function signUp() {
        Auth.register({email: vm.email, password: vm.password})
          .then(registerSuccess, displayErrors)

        function registerSuccess() {
          Auth.login({email: vm.email, password: vm.password})
            .then(redirectToHome, displayErrors)
        }

        function redirectToHome() {
          $state.go('main.home', {}, {reload: true});
        }

        function displayErrors(error) {
          vm.errors = error.data.errors;
        }
      }
    }
})();
