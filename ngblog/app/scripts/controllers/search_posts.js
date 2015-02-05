'use strict';

/**
 * @ngdoc function
 * @name ngblogApp.controller:MainCtrl
 * @description
 * # SearchPostsCtrl
 * Controller of the ngblogApp
 */
angular.module('ngblogApp')
  .controller('SearchPostsCtrl', ['$scope', 'postsService', '$http', '$route', '$routeParams', function ($scope, postsService, $http, $route, $routeParams) {
    $scope.keyword = $routeParams.keyword;
    postsService.searchPost($scope.keyword).
      success(function(data, status, headers, config) {
        $scope.posts = data.data.posts;
        $scope.bigTotalItems = data.data.total_count;
      }).
      error(function(data, status, headers, config) {
      });
  }]);
