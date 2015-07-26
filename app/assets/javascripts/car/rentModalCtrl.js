(function() {
  'use strict';
  angular
    .module('venity')
    .controller('RentModalCtrl', RentModalCtrl);

    RentModalCtrl.$inject = ['RideSrv', 'car', '$modalInstance'];

    function RentModalCtrl(RideSrv, car, $modalInstance) {
      var vm = this;
      vm.car = car;
      vm.addRide = addRide;
      vm.newRide = {
        start_datetime: new Date(),
        end_datetime: threeDaysFromNow()
      };

      function addRide() {
        RideSrv.create(car.id, vm.newRide)
          .success(function(data) {
            vm.newRide = {};
            $modalInstance.close();
          })
          .error(function(error) {
            vm.errors = error;
          })
      }

      function threeDaysFromNow() {
        var threeDaysInMiliseconds = 3*24*60*60*1000
        return new Date(Date.now() + threeDaysInMiliseconds)
      }
    }
})();
