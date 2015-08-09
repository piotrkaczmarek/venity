(function() {
  'use strict';
  angular
    .module('venity')
    .controller('DashboardCtrl', DashboardCtrl);

    DashboardCtrl.$inject = ['RideSrv'];

    function DashboardCtrl(RideSrv) {
      var vm = this;
      vm.rides = {};
      vm.accept = accept;
      vm.reject = reject;

      RideSrv.owned()
        .success(function(data) {
          vm.rides.owned = data.rides;
        });

      RideSrv.driven()
        .success(function(data) {
          vm.rides.driven = data.rides;
        });

      function accept(ride) {
        RideSrv.accept(ride.id)
          .success(function(data) {
            ride.state = data.ride.state;
          });
      }

      function reject(ride) {
        RideSrv.reject(ride.id)
          .success(function(data) {
            ride.state = data.ride.state;
          });
      }
    }
})();
