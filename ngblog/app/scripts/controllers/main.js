'use strict';

/**
 * @ngdoc function
 * @name ngblogApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ngblogApp
 */
angular.module('ngblogApp')
  .controller('MainCtrl', ['$scope', 'postsService', '$http', '$controller', '$location', '$timeout', '$routeParams', function($scope, postsService, $http, $controller, $location, $timeout, $routeParams) {
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
    };
    /*
    mobile
    */
    $scope.messageMark = true;
    $scope.mobileposts = [];
    $scope.postsitem = 10;
    $scope.load = true;
    $scope.busy = false;
    $scope.keyword = $routeParams.keyword;
    if($scope.keyword === null || $scope.keyword === '' || typeof $scope.keyword === 'undefined') {
      $scope.messageMark = true;
      postsService.getPosts(1, $scope.postsitem, 0).
      success(function(data) {
        $scope.mobileposts = data.data.posts;
      });
      $scope.loadMore = function() {
        if($scope.load === false) {
          $scope.loadMark = true;
        }
        if($scope.load === true) {
          $scope.loadMark = false;
          $scope.load = false;
        }
        postsService.getPosts(1, $scope.postsitem, 0).
        success(function(data) {
          $scope.busy = true;
          $timeout(function(){
            $scope.mobileposts = data.data.posts;
            $scope.loadMark = false;
            $scope.busy = false;
          },1000);
        });
      $scope.postsitem += 10;
      };
    }
    else {
      postsService.searchPost($scope.keyword).
      success(function(data) {
        $scope.mobileposts = data.posts;
        if ($scope.mobileposts === null || $scope.mobileposts === '' || $scope.mobileposts.length === 0) {
          $scope.messageMark = false;
        } else {
          $scope.messageMark = true;
        }
      });
    }
  }]);
