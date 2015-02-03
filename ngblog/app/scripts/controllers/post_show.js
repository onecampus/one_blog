'use strict';

/**
 * @ngdoc function
 * @name ngblogApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ngblogApp
 */
angular.module('ngblogApp')
  .controller('PostShowCtrl', ['$scope', '$http',  function ($scope, $http) {
    $scope.posts = [];
    $http.get('/api/v1/posts').
      success(function(data, status, headers, config) {
        $scope.posts = data.posts;
      }).
      error(function(data, status, headers, config) {
        console.log(data);
      });
  }]);
