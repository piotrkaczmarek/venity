(function() {
  'use strict';

  angular
    .module('venity')
    .factory('RideSrv', RideSrv);

  RideSrv.$inject = ['Auth', '$http'];

  function RideSrv(Auth, $http) {
    var factory = {
      owned: owned,
      driven: driven,
      show: show,
      create: create
    };
    return factory;

    function owned() {
      return $http.get('api/rides/owned');
    }

    function driven() {
      return $http.get('api/rides/driven');
    }

    function show(carId, rideId) {
      if(!rideId) {
        throw('No rideId given');
      }
      return $http.get('api/rides/' + rideId);
    }

    function create(carId, ride) {
      if(!carId) {
        throw('No carId given');
      }
      if(!ride) {
        throw('No ride given');
      }
      return $http.post('api/cars/' + carId + '/rides', ride);
    }
  }
})();
