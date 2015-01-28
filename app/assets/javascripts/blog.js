angular
  .module('AngularRails', [
    'ngRoute',
    'templates'
  ]).config(function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'home.html',
        controller: 'HomeCtrl'
      })
      .when('/posts', {
        templateUrl: 'posts.html',
        controller:  'PostCtrl'
      });
  });
