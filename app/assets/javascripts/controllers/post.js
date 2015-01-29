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
    $scope.delPost = function(id) {
      postService.delPost(id).
				success(function(data, status, headers, config) {
				  // $location.path('/posts').replace();
          if(data.status ==='destroied') {
						for(var i = $scope.posts.length - 1; i >= 0; i--){
							if($scope.posts[i].id == id){
								$scope.posts.splice(i, 1);
							}
						}
          } else {
            alert('删除失败');
          }
				}).
				error(function(data, status, headers, config) {
					console.log(data);
				});
    }
		$scope.addPost = function() {
			var post = {
        title: $scope.title,
        summary: $scope.summary,
        content: $scope.content,
        markdown: $scope.markdown,
        author: $scope.author,
        img: $scope.img,
        is_recommend: $scope.is_recommend,
        is_published: $scope.is_published,
        can_comment: $scope.can_comment
      }
			console.log(post);
			postService.createPost(post).
				success(function(data, status, headers, config) {
          console.log(data);
          if(data.status === 'created') {
						$scope.title = '';
						$scope.summary = '';
						$scope.content = '';
						$scope.markdown = '';
						$scope.author = '';
						$scope.img = '';
						$scope.is_recommend = '';
						$scope.is_published = '';
						$scope.can_comment = '';
						$location.path('/posts').replace();
          } else {
            alert('创建失败');
          }
				}).
				error(function(data, status, headers, config) {
					console.log(data);
				});
		};

    $scope.updatePost = function(id) {
			var post = {
        id: id,
        title: $scope.post.title,
        summary: $scope.post.summary,
        content: $scope.post.content,
        markdown: $scope.post.markdown,
        author: $scope.post.author,
        img: $scope.post.img,
        is_recommend: $scope.post.is_recommend,
        is_published: $scope.post.is_published,
        can_comment: $scope.post.can_comment
      }
			console.log(post);
			postService.updatePost(post).
				success(function(data, status, headers, config) {
          console.log(data);
          if(data.status === 'updated') {
						$location.path('/posts/' + id).replace();
          } else {
            alert('更新失败');
          }
				}).
				error(function(data, status, headers, config) {
					console.log(data);
				});
		};

  }]);
