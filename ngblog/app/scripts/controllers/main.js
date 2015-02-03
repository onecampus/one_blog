'use strict';

/**
 * @ngdoc function
 * @name ngblogApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ngblogApp
 */
angular.module('ngblogApp')
  .controller('MainCtrl', ['$scope', 'postsService',  function ($scope, postsService) {
    $scope.posts = [];

    postsService.getPosts(1, 10, 0).
      success(function(data, status, headers, config) {
        $scope.posts = data.data.posts;
      }).
      error(function(data, status, headers, config) {
        console.log(data);
      });

      $scope.myInterval = 5000;
      var slides = $scope.slides = [];
      $scope.addSlide = function() {
          var newWidth = slides.length + 1;
          slides.push({
            image: 'images/'+newWidth+'.jpg',
            text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' ' +
              ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
          });
      };
      for (var i=0; i<5; i++) {
        $scope.addSlide();
      }
  }]);
