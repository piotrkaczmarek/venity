(function() {
  'use strict';

  angular
    .module('hamurabi')
    .factory('AuthFactory', AuthFactory);

  AuthFactory.$inject = ['Auth', '$state'];

  function AuthFactory(Auth, $state) {
    var errors = '';

    return {
      signUp: signUp,
      signIn: signIn,
      signOut: signOut,
      getErrors: getErrors,
      clearErrors: clearErrors
    };

    function signUp(email, password) {
      Auth.register({email: email, password: password})
        .then(function(user) {
          $state.go('main.home', {}, {reload: true});
        }, function(error) {
          errors = error.data.errors;
        })
    }

    function getErrors() {
      return errors;
    }

    function clearErrors() {
      errors = '';
    }

    function signIn(email, password) {
      Auth.login({email: email, password: password})
        .then(function(user) {
          $state.go('main.home', {}, {reload: true});
        }, function(error) {
          errors = error.data.error;
        })
    }

    function signOut() {
      Auth.logout()
        .then(function(response) {
          $state.go('main.home', {}, { reload: true});
        })
    }
  }
})();
