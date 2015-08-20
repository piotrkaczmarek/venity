(function() {
  'use strict';
  angular
    .module('venity')
    .factory('CarSrv', CarSrv);

  CarSrv.$inject = ['Auth', '$http'];

  function CarSrv(Auth, $http) {
    var factory = {
      index: index,
      show: show,
      create: create,
      update: update,
      destroy: destroy,
      isOwned: isOwned,
      isAvailable: isAvailable
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

    function isAvailable(car, start_datetime, end_datetime) {
      var start, end;
      if(start_datetime) {
        start = new Date(start_datetime);
      }
      if(end_datetime) {
        end = new Date(end_datetime);
      }

      if (start_datetime && end_datetime) {
        return !_.find(car.accepted_rides, collides);
      } else if (start_datetime || end_datetime) {
        return !_.find(car.accepted_rides, isBetween);
      } else {
        return true;
      }

      function collides(ride) {
        return !(endsBefore(ride) || startsAfter(ride));
      }

      function endsBefore(ride) {
        return end < new Date(ride.start_datetime);
      }

      function startsAfter(ride) {
        return start > new Date(ride.end_datetime);
      }

      function isBetween(ride) {
        var date = start || end;
        return date > new Date(ride.start_datetime) && date < new Date(ride.end_datetime);
      }
    }
  }
})();
