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
    $scope.itemsPerPage = 5;
    $scope.bigTotalItems = null;
    $scope.bigCurrentPage = 1;
    $scope.maxSize = 8;
    $location.hash('top');
    postsService.getPosts($scope.bigCurrentPage, $scope.itemsPerPage, 0).
      success(function(data, status, headers, config) {
        $scope.posts = data.data.posts;
        $scope.bigTotalItems = data.data.total_count;
      }).
      error(function(data, status, headers, config) {
      });

    $scope.pageChanged = function() {
      postsService.getPosts($scope.bigCurrentPage, $scope.itemsPerPage, 0).
      success(function(data, status, headers, config) {
        $scope.posts = data.data.posts;
      }).
      error(function(data, status, headers, config) {
      });
      $log.log('Page changed to: ' + $scope.currentPage);
      };
    $scope.scrollTop = function() {
      $anchorScroll();
    }
  }]);
