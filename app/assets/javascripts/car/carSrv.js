(function() {
  'use strict';

  angular
    .module('venity')
    .factory('CarSrv', CarSrv);

  CarSrv.$inject = ['Auth', '$http', '$q'];

  function CarSrv(Auth, $http, $q) {
    var factory = {
      index: index,
      show: show,
      create: create,
      update: update,
      destroy: destroy,
      isOwned: isOwned
    };
    return factory;

    function index() {
      return $http.get('api/cars');
    }

    function show(carId) {
      if(!carId) {
        throw('No carId given');
      }
      return $http.get('api/cars/' + carId);
    }

    function create(car) {
      if(!car) {
        throw('No car given');
      }
      return $http.post('api/cars', car);
    }

    function update(car) {
      if(!car) {
        throw('No car given');
      }
      return $http.put('api/cars/' + car.id, car);
    }

    function destroy(carId) {
      if(!carId) {
        throw('No carId given');
      }
      return $http.delete('api/cars/' + carId);
    }

    function isOwned(ownerId) {
      return Auth._currentUser && Auth._currentUser.profile_id === ownerId;
    }
  }
})();
