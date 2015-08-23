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
        start_datetime: moment().toDate(),
        end_datetime: moment().add(3, 'days').toDate()
      };
      vm.startLocationLookupCallback = startLocationLookupCallback;
      vm.endLocationLookupCallback = endLocationLookupCallback;

      function addRide() {
        ensureEndLocation();
        RideSrv.create(car.id, vm.newRide)
          .success(function(data) {
            vm.newRide = {};
            $modalInstance.close();
          })
          .error(function(error) {
            vm.errors = error;
          });

        function ensureEndLocation() {
          if(!vm.newRide.end_location && vm.newRide.start_location) {
            vm.newRide.end_location = vm.newRide.start_location;
            vm.newRide.end_lng = vm.newRide.start_lng;
            vm.newRide.end_lat = vm.newRide.start_lat;
          }
        }
      }

      function startLocationLookupCallback(pickedLocation) {
        vm.newRide.start_lng = pickedLocation.longitude;
        vm.newRide.start_lat = pickedLocation.latitude;
        vm.newRide.start_location = pickedLocation.description;
        this.clear();
      }

      function endLocationLookupCallback(pickedLocation) {
        vm.newRide.end_lng = pickedLocation.longitude;
        vm.newRide.end_lat = pickedLocation.latitude;
        vm.newRide.end_location = pickedLocation.description;
        this.clear();
      }
    }
})();
