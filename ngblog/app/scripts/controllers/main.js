'use strict';

/**
 * @ngdoc function
 * @name ngblogApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ngblogApp
 */
angular.module('ngblogApp')
  .controller('MainCtrl', ['$scope', '$http',  function ($scope, $http) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.ping = 'pong';
    $scope.posts = [];
    $http.get('/api/v1/posts').
      success(function(data, status, headers, config) {
        $scope.posts = data.posts;
      }).
      error(function(data, status, headers, config) {
        console.log(data);
      });

  }]);
