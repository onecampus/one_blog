'use strict';

/**
 * @ngdoc function
 * @name ngblogApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ngblogApp
 */
angular.module('ngblogApp')
  .controller('AdminPostsCtrl', ['$scope', 'postsService', function($scope, postsService) {
    $scope.posts = [];
    postsService.getPosts().
      success(function(data, status, headers, config) {
        $scope.posts = data.posts;
      }).
      error(function(data, status, headers, config) {
        console.log(data);
      });
  }]);
