(function() {
  'use strict';

  angular
    .module('venity')
    .factory('RideSrv', RideSrv);

  RideSrv.$inject = ['Auth', '$http'];

  function RideSrv(Auth, $http) {
    var factory = {
      index: index,
      show: show,
      create: create
    };
    return factory;

    function index(carId) {
      if(!carId) {
        throw('No carId given');
      }
      return $http.get('api/cars/' + carId + '/rides');
    }

    function show(carId, rideId) {
      if(!carId || !rideId) {
        throw('No carId and/or rideId given');
      }
      return $http.get('api/cars/' + carId + '/rides/' + rideId);
    }

    function create(carId, ride) {
      if(!carId) {
        throw('No carId given');
      }
      return $http.post('api/cars/' + carId + '/rides', ride);
    }
  }
})();
