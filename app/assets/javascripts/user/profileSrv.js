(function() {
  'use strict';

  angular
    .module('venity')
    .factory('ProfileSrv', ProfileSrv);

  ProfileSrv.$inject = ['$http'];

  function ProfileSrv($http) {
    var factory = {
      getMy: getMy,
      update: update
    };
    return factory;

    function getMy() {
      return $http.get('api/me');
    }

    function update(profile) {
      return $http.put('api/me', profile);
    }
  }
})();
