(function() {
  'use strict';
  angular
    .module('venity')
    .controller('CarDetailsCtrl', CarDetailsCtrl);

    CarDetailsCtrl.$inject = ['car', 'CarSrv', '$state', '$modal'];

    function CarDetailsCtrl(car, CarSrv, $state, $modal) {
      var vm = this;
      vm.newRide = {};
      vm.rides = [];
      vm.openRentModal = openRentModal;
      vm.calendarOptions = calendarOptions();
      vm.car = car.data.car;
      vm.owned = CarSrv.isOwned(vm.car.owner.id);
      vm.calendarEvents = calendarEvents();

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

      function calendarEvents() {
        var events = _.map(vm.car.accepted_rides, function(ride) {
          return {
            start: ride.start_datetime,
            end: ride.end_datetime,
            title: ride.driver_name
          };
        });
        return [events];
      }

      function calendarOptions() {
        return {
          height: 450,
          editable: true
        };
      }
    }
})();
