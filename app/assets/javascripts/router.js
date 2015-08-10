(function() {
  'use strict';
  angular
    .module('venity')
    .config(['$stateProvider', function($stateProvider) {
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
                });
            }]
          }
        })
        .state('main.home', {
          url: '/',
          controller: 'HomeCtrl as vm',
          templateUrl: 'main/templates/home.html'
        })
        .state('main.dashboard', {
          url: '/dashboard',
          controller: 'DashboardCtrl as vm',
          templateUrl: 'main/templates/dashboard.html',
          resolve: {
            authenticate: authenticate()
          }
        })
        .state('main.carList', {
          url: '/cars',
          controller: 'CarListCtrl as vm',
          templateUrl: 'car/templates/car-list.html'
        })
        .state('main.carNew', {
          url: '/cars/new',
          controller: 'CarNewCtrl as vm',
          templateUrl: 'car/templates/car-new.html',
          resolve: {
            authenticate: authenticate()
          }
        })
        .state('main.carDetails', {
          url: '/cars/{carId:[0-9]{1,8}}',
          controller: 'CarDetailsCtrl as vm',
          templateUrl: 'car/templates/car-details.html'
        })
        .state('main.carEdit', {
          url: '/cars/{carId:[0-9]{1,8}}/edit',
          controller: 'CarEditCtrl as vm',
          templateUrl: 'car/templates/car-edit.html',
          resolve: {
            authenticate: authenticate()
          }
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
        });

        // http://stackoverflow.com/questions/22537311/angular-ui-router-login-authentication
        function authenticate() {
          return ['Auth', '$state', '$timeout', function(Auth, $state, $timeout) {
            Auth.currentUser().then(function(user) {
              return user;
            }, function(error) {
              $timeout(function() {
                $state.go('main.signIn');
              });
              return error;
            });
          }];
        }
    }]);
})();
