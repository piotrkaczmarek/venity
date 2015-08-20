(function() {
  'use strict';
  angular
    .module('venity')
    .controller('CarListCtrl', CarListCtrl);

    CarListCtrl.$inject = ['CarSrv'];

    function CarListCtrl(CarSrv) {
      var vm = this;
      vm.isAvailable = isAvailable;

      CarSrv.index()
        .success(function(data) {
          vm.cars = data.cars;
        });

      function isAvailable(car) {
        return CarSrv.isAvailable(car, vm.start_datetime, vm.end_datetime);
      }
    }
})();
