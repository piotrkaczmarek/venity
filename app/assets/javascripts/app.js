(function() {
  'use strict';

  angular
    .module('venity', [
      'ui.router',
      'templates',
      'Devise'
    ])
    .config(['$stateProvider', '$locationProvider', '$urlRouterProvider', function($stateProvider, $locationProvider, $urlRouterProvider) {
      $locationProvider.html5Mode(true);

      $urlRouterProvider.otherwise('/');

      $stateProvider
        .state('main', {
          abstract: true,
          controller: 'MainCtrl as mainCtrl',
          templateUrl: 'main.html',
          resolve: {
            'currentUser': ['Auth', function(Auth) {
              return Auth.currentUser()
                .then(function(user) {
                  return user;
                }, function(error) {
                  return;
                })
            }]
          }
        })
        .state('main.home', {
          url: '/',
          controller: 'BaseCtrl as vm',
          templateUrl: 'home.html'
        })
        .state('main.signUp', {
          url: '/sign-up',
          controller: 'SignUpCtrl as vm',
          templateUrl: 'sign-up.html'
        })
        .state('main.signIn', {
          url: '/sign-in',
          controller: 'SignInCtrl as vm',
          templateUrl: 'sign-in.html'
        })
    }]);
})();

