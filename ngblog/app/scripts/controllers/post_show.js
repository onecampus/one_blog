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
    $scope.postimg = null;
    $scope.imageMark = false;
    postsService.getPostById($routeParams.postId).
      success(function(data) {
        $scope.post = data.post;
        $scope.postimg = data.post.img;
        if($scope.postimg === null || $scope.postimg === '') {
          $scope.imageMark = false;
        }
        else {
          $scope.imageMark = true;
        }
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
