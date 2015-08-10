(function() {
  'use strict';

  angular
    .module('venity', [
      'ui.router',
      'ui.bootstrap',
      'locator',
      'templates',
      'pascalprecht.translate',
      'Devise'
    ])
    .config(['$stateProvider', '$locationProvider', '$urlRouterProvider', '$httpProvider', '$translateProvider', 'translations', function(
              $stateProvider,   $locationProvider,   $urlRouterProvider,   $httpProvider,   $translateProvider,   translations) {
      $locationProvider.html5Mode(true);

      $urlRouterProvider.otherwise('/');

      $translateProvider
        .translations('en', translations.en)
        .translations('pl', translations.pl)
        .preferredLanguage('pl');

      $httpProvider.defaults.headers.common.Accept = 'application/vnd.venity+json; version=1';

    }]);
})();

