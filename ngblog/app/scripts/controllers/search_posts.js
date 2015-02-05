'use strict';

/**
 * @ngdoc function
 * @name ngblogApp.controller:MainCtrl
 * @description
 * # SearchPostsCtrl
 * Controller of the ngblogApp
 */
angular.module('ngblogApp')
  .controller('SearchPostsCtrl', ['$scope', 'postsService', '$routeParams', '$controller', function ($scope, postsService, $routeParams, $controller) {
    $scope.keyword = $routeParams.keyword;
    $scope.messageMark = true;
    postsService.searchPost($scope.keyword).
      success(function(data, status, headers, config) {
        $scope.posts = data.posts;
        if($scope.posts === null || $scope.posts === '' || $scope.posts.length === 0) {
          $scope.messageMark = false;
        }
        else {
          $scope.messageMark = true;
        }
      }).
      error(function(data, status, headers, config) {
        console.log(data);
      });
    $controller('BaseCtrl', {$scope: $scope});
  }]);
