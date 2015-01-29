'use strict';

/**
 * @ngdoc function
 * @name ngblogApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the ngblogApp
 */
angular.module('ngblogApp')
  .controller('AboutCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.ping = null;
    $http.get('/api/v1/ping').
      success(function(data, status, headers, config) {
        console.log(data);
        $scope.ping = data;
      }).
      error(function(data, status, headers, config) {
        console.log(data);
      });
  }]);
