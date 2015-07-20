(function() {
  'use strict';
  angular
    .module('venity')
    .controller('CarDetailsCtrl', CarDetailsCtrl);

    CarDetailsCtrl.$inject = ['CarSrv', 'Auth', '$stateParams', '$state'];

    function CarDetailsCtrl(CarSrv, Auth, $stateParams, $state) {
      var vm = this;

      CarSrv.show($stateParams.carId)
        .success(function(data) {
          vm.car = data.car;
          vm.owned = CarSrv.isOwned(vm.car.owner.id);
        })
        .error(function(error) {
          $state.go('main.carList');
        })
    }
})();
