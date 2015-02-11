'use strict';

/**
 * @ngdoc function
 * @name ngblogApp.controller:BaseCtrl
 * @description
 * # BaseCtrl
 * Controller of the ngblogApp
 */
angular.module('ngblogApp')
  .controller('BaseCtrl', ['$scope', '$location', 'SessionService', function($scope, $location, SessionService) {
    $scope.search = function() {
      $location.path('/search/posts');
      $location.search('keyword=' + $scope.keyword);
      $location.replace();
    };
    $scope.mobilesearch = function() {
      $location.path('/');
      $location.search('keyword=' + $scope.keyword);
      $location.replace();
    };
    $scope.currentUser = SessionService.currentUser;
  }]);
