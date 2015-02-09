'use strict';

/**
 * @ngdoc function
 * @name ngblogApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ngblogApp
 */
angular.module('ngblogApp')
  .controller('MainCtrl', ['$scope', 'postsService', '$http', '$controller', function($scope, postsService, $http, $controller) {
    $scope.posts = [];

    postsService.getPosts(1, 10, 0).
    success(function(data) {
      $scope.posts = data.data.posts;
    });
    /*
    图片轮转
    */
    $scope.myInterval = 5000;
    var slides = $scope.slides = [];
    $scope.addSlide = function() {
      var newWidth = 600 + slides.length + 1;
      slides.push({
        image: 'http://placekitten.com/' + newWidth + '/300'
      });
    };
    for (var i = 0; i < 4; i++) {
      $scope.addSlide();
    }
    $controller('BaseCtrl', {
      $scope: $scope
    });
  }]);
