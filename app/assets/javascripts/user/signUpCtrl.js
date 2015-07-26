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
        Auth.register(registerAttributes())
          .then(registerSuccess, displayErrors);

        function registerSuccess() {
          Auth.login({email: vm.email, password: vm.password})
            .then(redirectToHome, displayErrors);
        }

        function redirectToHome() {
          $state.go('main.home', {}, {reload: true});
        }

        function displayErrors(error) {
          vm.errors = error.data.errors;
        }

        function registerAttributes() {
          return {
            email: vm.email,
            password: vm.password,
            first_name: vm.first_name,
            last_name: vm.last_name
          };
        }
      }
    }
})();
