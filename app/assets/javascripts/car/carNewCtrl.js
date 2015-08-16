(function() {
  'use strict';
  angular
    .module('venity')
    .controller('CarNewCtrl', CarNewCtrl);

    CarNewCtrl.$inject = ['CarSrv', '$state', 'Upload'];

    function CarNewCtrl(CarSrv, $state, Upload) {
      var vm = this;
      vm.car = {
        production_year: 2015
      };
      vm.create = create;

      function create() {
        CarSrv.create(vm.car)
          .success(redirectToCarList)
          .error(displayErrors);

        function redirectToCarList() {
          $state.go('main.carList', {}, {reload: true});
        }

        function displayErrors(error) {
          vm.errors = error;
        }
      }
    }
})();
