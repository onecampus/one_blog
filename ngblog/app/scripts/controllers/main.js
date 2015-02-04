'use strict';

/**
 * @ngdoc function
 * @name ngblogApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ngblogApp
 */
angular.module('ngblogApp')
  .controller('MainCtrl', ['$scope', 'postsService', '$http', function ($scope, postsService, $http) {
    $scope.posts = [];

    // cgbusy start
    $scope.delay = 0;
    $scope.minDuration = 0;
    $scope.message = 'Please Wait...';
    $scope.backdrop = true;
    $scope.refresh = $http.get('http://httpbin.org/delay/3');
    // https://github.com/angular-ui/ui-router/issues/456
    // cgbusy end

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
