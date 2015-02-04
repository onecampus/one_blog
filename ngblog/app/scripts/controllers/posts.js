'use strict';

/**
 * @ngdoc function
 * @name ngblogApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ngblogApp
 */
angular.module('ngblogApp')
  .controller('PostsCtrl', ['$scope', '$log', 'postsService', '$location', '$anchorScroll', function($scope, $log, postsService,$location,$anchorScroll) {
    $scope.posts = [];
    postsService.getPosts(1, 10, 0).
      success(function(data, status, headers, config) {
        $scope.posts = data.data.posts;
        $scope.totalItems = data.data.total_count;
      }).
      error(function(data, status, headers, config) {
        console.log(data);
      });

    $scope.pageChanged = function() {
      postsService.getPosts($scope.currentPage, 10, 0).
      success(function(data, status, headers, config) {
        $scope.posts = data.data.posts;
      }).
      error(function(data, status, headers, config) {
        console.log(data);
      });
      $log.log('Page changed to: ' + $scope.currentPage);
      };
    $scope.scrollTop = function() {
      $location.hash('top');
      $anchorScroll();
    }
  }]);
