(function() {
  'use strict';

  angular
    .module('venity', [
      'ui.router',
      'ui.bootstrap',
      'locator',
      'templates',
      'Devise'
    ])
    .config(['$stateProvider', '$locationProvider', '$urlRouterProvider', '$httpProvider', function($stateProvider, $locationProvider, $urlRouterProvider, $httpProvider) {
      $locationProvider.html5Mode(true);

      $urlRouterProvider.otherwise('/');

      $httpProvider.defaults.headers.common.Accept = 'application/vnd.venity+json; version=1'

      $stateProvider
        .state('main', {
          abstract: true,
          controller: 'MainCtrl as mainCtrl',
          templateUrl: 'main/templates/main.html',
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
          controller: 'HomeCtrl as vm',
          templateUrl: 'main/templates/home.html'
        })
        .state('main.carList', {
          url: '/cars',
          controller: 'CarListCtrl as vm',
          templateUrl: 'car/templates/car-list.html'
        })
        .state('main.carNew', {
          url: '/cars/new',
          controller: 'CarNewCtrl as vm',
          templateUrl: 'car/templates/car-new.html'
        })
        .state('main.carDetails', {
          url: '/cars/{carId:[0-9]{1,8}}',
          controller: 'CarDetailsCtrl as vm',
          templateUrl: 'car/templates/car-details.html'
        })
        .state('main.carEdit', {
          url: '/cars/{carId:[0-9]{1,8}}/edit',
          controller: 'CarEditCtrl as vm',
          templateUrl: 'car/templates/car-edit.html'
        })
        .state('main.profile', {
          url: '/profile',
          controller: 'ProfileCtrl as vm',
          templateUrl: 'user/templates/profile.html',
          resolve: {
            authenticate: authenticate()
          }
        })
        .state('main.signUp', {
          url: '/sign-up',
          controller: 'SignUpCtrl as vm',
          templateUrl: 'user/templates/sign-up.html'
        })
        .state('main.signIn', {
          url: '/sign-in',
          controller: 'SignInCtrl as vm',
          templateUrl: 'user/templates/sign-in.html'
        })

        // http://stackoverflow.com/questions/22537311/angular-ui-router-login-authentication
        function authenticate() {
          return ['Auth', '$state', '$timeout', function(Auth, $state, $timeout) {
            Auth.currentUser().then(function(user) {
              return user;
            }, function(error) {
              $timeout(function() {
                $state.go('main.signIn')
              });
              return error;
            })
          }];
        }

    }]);
})();

