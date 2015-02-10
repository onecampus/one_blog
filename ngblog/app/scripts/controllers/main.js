'use strict';

/**
 * @ngdoc function
 * @name ngblogApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ngblogApp
 */
angular.module('ngblogApp')
  .controller('MainCtrl', ['$scope', 'postsService', '$http', '$controller', "$location", "$timeout", function($scope, postsService, $http, $controller, $location, $timeout) {
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
      var newWidth = slides.length + 1;
      slides.push({
        image: '/images/slide' + newWidth + '.jpg',
        text: ['More', 'Extra', 'Lots of', 'Surplus'][slides.length % 4] + ' ' + ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
      });
    };
    for (var i = 0; i < 5; i++) {
      $scope.addSlide();
    }

    $controller('BaseCtrl', {
      $scope: $scope
    });
    $scope.navAnimate = function() {
      $scope.animateMark = true;
      $timeout(function(){
        $location.path('/posts');
        $location.replace();
      },930);
    }
  }]);
