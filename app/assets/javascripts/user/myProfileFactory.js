(function() {
  'use strict';

  angular
    .module('venity')
    .factory('MyProfileFactory', MyProfileFactory);

  MyProfileFactory.$inject = ['Auth', '$http'];

  function MyProfileFactory(Auth, $http) {
    var errors = '';

    return {
      me: me,
      update: update
    };

    function me() {
      return $http.get('api/me');
    }

    function update(profile) {
      return $http.put('api/me', {
        first_name: profile.first_name,
        last_name: profile.last_name
      })
    }
  }
})();
