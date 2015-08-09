(function() {
  'use strict';
  angular
    .module('venity')
    .controller('DashboardCtrl', DashboardCtrl);

    DashboardCtrl.$inject = ['RideSrv'];

    function DashboardCtrl(RideSrv) {
      var vm = this;
      vm.rides = {};

      RideSrv.owned()
        .success(function(data) {
          vm.rides.owned = data.rides;
        });

      RideSrv.driven()
        .success(function(data) {
          vm.rides.driven = data.rides;
        });
    }
})();
