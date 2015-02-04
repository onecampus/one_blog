'use strict';

/**
 * @ngdoc function
 * @name ngblogApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ngblogApp
 */
angular.module('ngblogApp')
  .controller('PostShowCtrl', ['$scope', '$log', 'postsService', '$routeParams', function($scope, $log, postsService, $routeParams) {
    $scope.post = null;
    postsService.getPostById($routeParams.postId).
      success(function(data, status, headers, config) {
        $scope.post = data.post;
      }).
      error(function(data, status, headers, config) {
        console.log(data);
      });

      $scope.posts = [];
      postsService.getPosts(1, 14, 0).
        success(function(data, status, headers, config) {
          $scope.posts = data.data.posts;
          $scope.totalItems = data.data.total_count;
        }).
        error(function(data, status, headers, config) {
          console.log(data);
        });
  }]);
