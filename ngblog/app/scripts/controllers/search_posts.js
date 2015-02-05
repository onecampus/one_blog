'use strict';

/**
 * @ngdoc function
 * @name ngblogApp.controller:MainCtrl
 * @description
 * # SearchPostsCtrl
 * Controller of the ngblogApp
 */
angular.module('ngblogApp')
  .controller('SearchPostsCtrl', ['$scope', 'postsService', '$http', '$route', '$routeParams', '$window', function ($scope, postsService, $http, $route, $routeParams, $window) {
    $scope.keyword = $routeParams.keyword;
    $scope.messageMark = true;
    postsService.searchPost($scope.keyword).
      success(function(data, status, headers, config) {
        $scope.posts = data.posts;
        if($scope.posts == null || $scope.posts == "") {
          $scope.messageMark = false;
        }
        else {
          $scope.messageMark = true;
        }
      }).
      error(function(data, status, headers, config) {
      });
    $scope.search = function() {
      $window.location.href = '/#/search/posts?keyword=' + $scope.keyword;
    }
  }]);
