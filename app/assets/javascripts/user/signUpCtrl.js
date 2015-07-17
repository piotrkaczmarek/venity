(function() {
  'use strict';
  angular
    .module('venity')
    .controller('SignUpCtrl', SignUpCtrl);

    SignUpCtrl.$inject = ['AuthFactory'];

    function SignUpCtrl(AuthFactory) {
      var vm = this;
      vm.authFactory = AuthFactory;
      vm.getErrors = AuthFactory.getErrors;
      vm.signIn = AuthFactory.signIn;

      AuthFactory.clearErrors();
    }
})();
