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
          templateUrl: 'main/main.html',
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
          templateUrl: 'main/home.html'
        })
        .state('main.account', {
          url: '/account',
          controller: 'AccountCtrl as vm',
          templateUrl: 'user/account.html',
          resolve: { authenticate: authenticate() }
        })
        .state('main.signUp', {
          url: '/sign-up',
          controller: 'SignUpCtrl as vm',
          templateUrl: 'user/sign-up.html'
        })
        .state('main.signIn', {
          url: '/sign-in',
          controller: 'SignInCtrl as vm',
          templateUrl: 'user/sign-in.html'
        })

        // http://stackoverflow.com/questions/22537311/angular-ui-router-login-authentication
        function authenticate() {
          return ['Auth', '$q', '$state', '$timeout', function(Auth, $q, $state, $timeout) {
            if(Auth.isAuthenticated()) {
              return $q.when();
            } else {
              $timeout(function() {
                $state.go('main.signIn')
              })
              return $q.return();
            }
          }];
        }

    }]);
})();

