'use strict';

/**
 * @ngdoc function
 * @name ngblogApp.controller:SearchPostsCtrl
 * @description
 * # SearchPostsCtrl
 * Controller of the ngblogApp
 */
angular.module('ngblogApp')
  .controller('SearchPostsCtrl', ['$scope', 'postsService', '$routeParams', '$controller', function($scope, postsService, $routeParams, $controller) {
    $scope.keyword = $routeParams.keyword;
    $scope.messageMark = true;
    postsService.searchPost($scope.keyword).
    success(function(data) {
      $scope.posts = data.posts;
      if ($scope.posts === null || $scope.posts === '' || $scope.posts.length === 0) {
        $scope.messageMark = false;
      } else {
        $scope.messageMark = true;
      }
    });
    $controller('BaseCtrl', {
      $scope: $scope
    });
  }]);
