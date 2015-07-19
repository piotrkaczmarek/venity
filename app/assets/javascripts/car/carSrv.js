(function() {
  'use strict';

  angular
    .module('venity')
    .factory('CarSrv', CarSrv);

  CarSrv.$inject = ['Auth', '$http'];

  function CarSrv(Auth, $http) {
    var factory = {
      index: index,
      create: create,
      update: update,
      destroy: destroy
    };
    return factory;

    function index() {
      return $http.get('api/cars');
    }

    function create(car) {
      return $http.post('api/cars', car);
    }

    function update(car) {
      return $http.put('api/cars/' + car.id, car);
    }

    function destroy(carId) {
      return $http.delete('api/cars/' + carId);
    }
  }
})();
