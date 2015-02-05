'use strict';

/**
 * @ngdoc function
 * @name ngblogApp.controller:MainCtrl
 * @description
 * # SearchPostsCtrl
 * Controller of the ngblogApp
 */
angular.module('ngblogApp')
  .controller('SearchPostsCtrl', ['$scope', '$controller', function ($scope, $controller) {
    $controller('BaseCtrl', {$scope: $scope});
  }]);
