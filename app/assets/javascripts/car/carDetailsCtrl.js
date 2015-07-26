(function() {
  'use strict';
  angular
    .module('venity')
    .controller('CarDetailsCtrl', CarDetailsCtrl);

    CarDetailsCtrl.$inject = ['CarSrv', '$stateParams', '$state', '$modal'];

    function CarDetailsCtrl(CarSrv, $stateParams, $state, $modal) {
      var vm = this;
      vm.newRide = {};
      vm.rides = [];
      vm.openRentModal = openRentModal;

      CarSrv.show($stateParams.carId)
        .success(function(data) {
          vm.car = data.car;
          vm.owned = CarSrv.isOwned(vm.car.owner.id);
        })
        .error(function(error) {
          $state.go('main.carList');
        });

      function openRentModal() {
        $modal.open(modalOptions());

        function modalOptions() {
          return {
            templateUrl: 'car/templates/rent-modal.html',
            controller: 'RentModalCtrl as vm',
            size: 'lg',
            resolve: {
              car: function() {
                return vm.car;
              }
            }
          };
        }
      }

    }
})();
