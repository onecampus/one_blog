'use strict';

/**
 * @ngdoc function
 * @name ngblogApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ngblogApp
 */
angular.module('ngblogApp')
  .controller('MainCtrl', ['$scope', '$http',  function ($scope, $http) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.ping = 'pong';
    $scope.posts = [];
    $http.get('/api/v1/posts').
      success(function(data, status, headers, config) {
        $scope.posts = data.posts;
      }).
      error(function(data, status, headers, config) {
        console.log(data);
      });
    $scope.imageSrc=["/images/head-ba.png","/images/logo.png","images/two-code.jpg"];  // 图片src数组
    $scope.imageIndex = 0;  // 图片下标
    /*
    图片左切换
    */
    $scope.swithLeftPic = function(){
      if($scope.imageIndex <= 0) {
        return;
      }
      else {
        $scope.imageIndex -= 1;
      }
    };
    /*
    图片右切换
    */
    $scope.swithRightPic = function(){
      if($scope.imageIndex >= $scope.imageSrc.length-1) {
        return;
      }
      else {
        $scope.imageIndex += 1;
      }
    };
  }]);
