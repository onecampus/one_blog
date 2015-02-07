'use strict';

/**
 * @ngdoc function
 * @name ngblogApp.controller:BaseCtrl
 * @description
 * # BaseCtrl
 * Controller of the ngblogApp
 */
angular.module('ngblogApp')
  .controller('BaseCtrl', ['$scope', '$location', function($scope, $location) {
    $scope.search = function() {
      $location.path('/search/posts');
      $location.search('keyword=' + $scope.keyword);
      $location.replace();
    };
  }]);
