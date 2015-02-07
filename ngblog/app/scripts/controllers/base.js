'use strict';

/**
 * @ngdoc function
 * @name ngblogApp.controller:BaseController
 * @description
 * # MainCtrl
 * Controller of the ngblogApp
 */
angular.module('ngblogApp')
  .controller('BaseCtrl', ['$scope', '$window', function ($scope, $window) {
    $scope.search = function() {
      $window.location.href = '/search/posts?keyword=' + $scope.keyword;
    };
  }]);
