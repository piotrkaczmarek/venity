(function() {
  'use strict';
  angular
    .module('venity')
    .controller('CarListCtrl', CarListCtrl);

    CarListCtrl.$inject = ['CarSrv'];

    function CarListCtrl(CarSrv) {
      var vm = this;

      CarSrv.index()
        .success(function(data) {
          vm.cars = data.cars;
        });
    }
})();
