(function() {
  'use strict';

  angular
    .module('venity')
    .factory('ProfileSrv', ProfileSrv);

  ProfileSrv.$inject = ['Auth', '$http'];

  function ProfileSrv(Auth, $http) {
    var factory = {
      getMy: getMy,
      update: update
    }
    return factory;

    function getMy() {
      return $http.get('api/me');
    }

    function update(profile) {
      return $http.put('api/me', {
        first_name: profile.first_name,
        last_name: profile.last_name
      });
    }
  }
})();
