'use strict';

/**
 * @ngdoc function
 * @name ngblogApp.controller:BaseController
 * @description
 * # MainCtrl
 * Controller of the ngblogApp
 */
angular.module('ngblogApp')
  .controller('BaseCtrl', ['$scope', 'postsService', '$routeParams', '$window', function ($scope, postsService, $routeParams, $window) {
    $scope.keyword = $routeParams.keyword;
    $scope.messageMark = true;
    postsService.searchPost($scope.keyword).
      success(function(data, status, headers, config) {
        $scope.posts = data.posts;
        if($scope.posts === null || $scope.posts === '') {
          $scope.messageMark = false;
        }
        else {
          $scope.messageMark = true;
        }
      }).
      error(function(data, status, headers, config) {
        console.log(data);
      });
    $scope.search = function() {
      $window.location.href = '/#/search/posts?keyword=' + $scope.keyword;
    };
  }]);
