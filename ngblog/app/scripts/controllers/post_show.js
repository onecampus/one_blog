'use strict';

/**
 * @ngdoc function
 * @name ngblogApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ngblogApp
 */
angular.module('ngblogApp')
  .controller('PostShowCtrl', ['$scope', '$log', 'postsService', '$routeParams', '$controller', function($scope, $log, postsService, $routeParams, $controller) {
    $scope.post = null;
    postsService.getPostById($routeParams.postId).
      success(function(data) {
        $scope.post = data.post;
      }).
      error(function(data) {
        console.log(data);
      });

    $scope.posts = [];
    postsService.getPosts(1, 14, 0).
      /* jshint camelcase: false */
      success(function(data) {
        $scope.posts = data.data.posts;
        $scope.totalItems = data.data.total_count;
      }).
      error(function(data) {
        console.log(data);
      });
    $controller('BaseCtrl', {$scope: $scope});
  }]);
