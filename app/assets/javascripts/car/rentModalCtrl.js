(function() {
  'use strict';
  angular
    .module('venity')
    .controller('RentModalCtrl', RentModalCtrl);

    RentModalCtrl.$inject = ['RideSrv', 'car', 'location', '$modalInstance', '$scope'];

    function RentModalCtrl(RideSrv, car, locationSrv, $modalInstance, $scope) {
      var vm = this;
      vm.car = car;
      vm.addRide = addRide;
      vm.newRide = {
        start_datetime: new Date(),
        end_datetime: threeDaysFromNow()
      };
      vm.startLocationLookupCallback = startLocationLookupCallback;
      vm.endLocationLookupCallback = endLocationLookupCallback;

      function addRide() {
        RideSrv.create(car.id, vm.newRide)
          .success(function(data) {
            vm.newRide = {};
            $modalInstance.close();
          })
          .error(function(error) {
            vm.errors = error;
          });
      }

      function threeDaysFromNow() {
        var threeDaysInMiliseconds = 3*24*60*60*1000;
        return new Date(Date.now() + threeDaysInMiliseconds);
      }

      function startLocationLookupCallback(pickedLocation) {
        vm.newRide.start_lng = pickedLocation.longitude;
        vm.newRide.start_lat = pickedLocation.latitude;
        vm.newRide.start_description = pickedLocation.description;
        this.clear();
      }

      function endLocationLookupCallback(pickedLocation) {
        vm.newRide.end_lng = pickedLocation.longitude;
        vm.newRide.end_lat = pickedLocation.latitude;
        vm.newRide.end_description = pickedLocation.description;
        this.clear();
      }
    }
})();
