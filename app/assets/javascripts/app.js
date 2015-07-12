var app = angular
  .module('hamurabi', ['ui.router', 'templates']);

app.config(function($stateProvider) {
  $stateProvider
    .state('index', {
      url: '',
      templateUrl: 'index.html'
    })
});
