(function() {
  'use strict';
  angular
    .module('venity')
    .controller('CarEditCtrl', CarEditCtrl);

    CarEditCtrl.$inject = ['CarSrv', 'Auth', '$stateParams', '$state'];

    function CarEditCtrl(CarSrv, Auth, $stateParams, $state) {
      var vm = this;
      vm.update = update;

      CarSrv.show($stateParams.carId)
        .success(function(data) {
          vm.car = data.car;
        })
        .error(function(error) {
          $state.go('main.carList');
        })

      function update() {
        CarSrv.update(vm.car)
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
