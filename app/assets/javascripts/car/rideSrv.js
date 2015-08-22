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
      accept: accept,
      reject: reject,
      cancel: cancel,
      create: create
    };
    return factory;

    function owned() {
      return $http.get('api/rides/owned');
    }

    function driven() {
      return $http.get('api/rides/driven');
    }

    function accept(rideId) {
      if(!rideId) {
        throw('No rideId given');
      }
      return $http.put('api/rides/' + rideId + '/accept');
    }

    function reject(rideId) {
      if(!rideId) {
        throw('No rideId given');
      }
      return $http.put('api/rides/' + rideId + '/reject');
    }

    function cancel(rideId) {
      if(!rideId) {
        throw('No rideId given');
      }
      return $http.put('api/rides/' + rideId + '/cancel');
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
