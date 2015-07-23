(function() {
  'use strict';
  angular
    .module('venity')
    .controller('CarDetailsCtrl', CarDetailsCtrl);

    CarDetailsCtrl.$inject = ['CarSrv', 'RideSrv', 'Auth', '$stateParams', '$state'];

    function CarDetailsCtrl(CarSrv, RideSrv, Auth, $stateParams, $state) {
      var vm = this;
      vm.newRide = {};
      vm.rides = [];
      vm.addRide = addRide;

      CarSrv.show($stateParams.carId)
        .success(function(data) {
          vm.car = data.car;
          vm.owned = CarSrv.isOwned(vm.car.owner.id);
        })
        .error(function(error) {
          $state.go('main.carList');
        })

      RideSrv.index($stateParams.carId)
        .success(function(data) {
          vm.rides = data.rides;
        })

      function addRide() {
        RideSrv.create(vm.car.id, vm.newRide)
          .success(function(data) {
            vm.newRide = {};
            vm.rides.push(data.ride);
          })
          .error(function(error) {
            vm.errors = error;
          })
      }
    }
})();
