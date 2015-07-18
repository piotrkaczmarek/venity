(function() {
  'use strict';
  angular
    .module('venity')
    .controller('AccountCtrl', AccountCtrl);

    AccountCtrl.$inject = ['AuthFactory'];

    function AccountCtrl(AuthFactory) {
      var vm = this;
      vm.authFactory = AuthFactory;
      vm.getErrors = AuthFactory.getErrors;
      vm.signIn = AuthFactory.signIn;

      AuthFactory.clearErrors();
    }
})();
