'use strict';

/**
 * @ngdoc function
 * @name ngblogApp.controller:PostsCtrl
 * @description
 * # PostsCtrl
 * Controller of the ngblogApp
 */
angular.module('ngblogApp')
  .controller('PostsCtrl', ['$scope', '$log', 'postsService', '$location', '$anchorScroll', '$controller', function($scope, $log, postsService, $location, $anchorScroll, $controller) {
    $scope.posts = [];
    $scope.itemsPerPage = 5;
    $scope.bigTotalItems = null;
    $scope.bigCurrentPage = 1;
    $scope.maxSize = 8;
    postsService.getPosts($scope.bigCurrentPage, $scope.itemsPerPage, 0).
      /* jshint camelcase: false */
    success(function(data) {
      $scope.posts = data.data.posts;
      $scope.bigTotalItems = data.data.total_count;
    });

    $scope.pageChanged = function() {
      postsService.getPosts($scope.bigCurrentPage, $scope.itemsPerPage, 0).
      success(function(data) {
        $scope.posts = data.data.posts;
      });
    };
    $scope.scrollTop = function() {
      $anchorScroll();
    };

    $controller('BaseCtrl', {
      $scope: $scope
    });
  }]);
