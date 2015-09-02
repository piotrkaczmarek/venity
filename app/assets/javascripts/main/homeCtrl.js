(function() {
  'use strict';
  angular
    .module('venity')
    .controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = ['$http'];

    function HomeCtrl($http) {
      var vm = this;
      vm.addContact = addContact;

      function addContact() {
        $http.post('api/contacts', { email: vm.email })
          .success(function() {
            vm.email = '';
          });
      }
    }
})();
