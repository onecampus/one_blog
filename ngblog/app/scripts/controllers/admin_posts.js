'use strict';

/**
 * @ngdoc function
 * @name ngblogApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ngblogApp
 */
angular.module('ngblogApp')
  .controller('AdminPostsCtrl', ['$scope', '$log', 'postsService', function($scope, $log, postsService) {
    $scope.posts = [];

    $scope.totalItems = 0;
    $scope.currentPage = 1;
    $scope.itemsPerPage = 20;
    $scope.maxSize = 5;
    postsService.getPosts(1, 20, 0).
      success(function(data, status, headers, config) {
        $scope.posts = data.data.posts;
        $scope.totalItems = data.data.total_count;
      }).
      error(function(data, status, headers, config) {
        console.log(data);
      });

    $scope.pageChanged = function() {
      postsService.getPosts($scope.currentPage, 20, 0).
        success(function(data, status, headers, config) {
          $scope.posts = data.data.posts;
        }).
        error(function(data, status, headers, config) {
          console.log(data);
        });
      $log.log('Page changed to: ' + $scope.currentPage);
    };
  }]);
