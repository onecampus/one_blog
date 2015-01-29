angular.module('AngularRails')
  .controller('PostCtrl', ['$scope', '$route', '$routeParams', '$location', 'postService', function($scope, $route, $routeParams, $location, postService) {
		'use strict';
		$scope.$on('$routeChangeSuccess', function() {
      console.log($routeParams);
      console.log(Utils.isEmpty($routeParams));
      console.log($route.current.params);
		});
    $scope.posts = [];

    if(Utils.isEmpty($routeParams)) {
			postService.getPosts().
				success(function(data, status, headers, config) {
					$scope.posts = data.posts;
				}).
				error(function(data, status, headers, config) {
					console.log(data);
				});
    }
		// single post
		$scope.post = Object;
    if($routeParams.postId !== undefined && /^\d+$/.test($routeParams.postId)) {
      console.log($routeParams);
			postService.getPostById($routeParams.postId).
				success(function(data, status, headers, config) {
					$scope.post = data.post;
				}).
				error(function(data, status, headers, config) {
					console.log(data);
				});
    }
		$scope.addPost = function() {
			$scope.posts.push({
        title: $scope.title,
        summary: $scope.summary,
        content: $scope.content,
        markdown: $scope.markdown,
        author: $scope.author,
        img: $scope.img,
        publish_time: $scope.publish_time,
        is_recommend: $scope.is_recommend,
        is_published: $scope.is_published,
        can_comment: $scope.can_comment
      });
			$scope.title = '';
      $scope.summary = '';
      $scope.content = '';
      $scope.markdown = '';
      $scope.author = '';
      $scope.img = '';
      $scope.publish_time = '';
      $scope.is_recommend = '';
      $scope.is_published = '';
      $scope.can_comment = '';
      $location.path('/posts').replace();
		};
  }]);
