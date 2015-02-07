'use strict';

/**
 * @ngdoc function
 * @name ngblogApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ngblogApp
 */
angular.module('ngblogApp')
  .controller('PostsCtrl', ['$scope', '$log', 'postsService', '$location', '$anchorScroll', '$controller', function($scope, $log, postsService, $location, $anchorScroll, $controller) {
    $scope.posts = [];
    $scope.itemsPerPage = 5;
    $scope.bigTotalItems = null;
    $scope.bigCurrentPage = 1;
    $scope.maxSize = 8;
    $location.hash('top');
    postsService.getPosts($scope.bigCurrentPage, $scope.itemsPerPage, 0).
      /* jshint camelcase: false */
      success(function(data) {
        $scope.posts = data.data.posts;
        $scope.bigTotalItems = data.data.total_count;
      }).
      error(function(data) {
      });

    $scope.pageChanged = function() {
      postsService.getPosts($scope.bigCurrentPage, $scope.itemsPerPage, 0).
      success(function(data) {
        $scope.posts = data.data.posts;
      }).
      error(function(data) {
      });
      $log.log('Page changed to: ' + $scope.currentPage);
      };
    $scope.scrollTop = function() {
      $anchorScroll();
    };

    $controller('BaseCtrl', {$scope: $scope});
  }]);
