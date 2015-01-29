angular.module('AngularRails')
  .controller('PostCtrl', ['$scope', 'postService', function($scope, postService) {
		'use strict';
    $scope.posts = [];
    postService.getPosts().
			success(function(data, status, headers, config) {
				$scope.posts = data.posts;
				console.log(config);
			}).
			error(function(data, status, headers, config) {
				console.log(data);
				console.log(status);
				console.log(headers);
				console.log(config);
			});
    console.log($scope.posts);
  }]);
