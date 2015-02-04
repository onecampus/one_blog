'use strict';

/**
 * @ngdoc function
 * @name ngblogApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ngblogApp
 */
angular.module('ngblogApp')
  .controller('AdminPostsCtrl', ['$scope', '$log', 'postsService', function($scope, $log, postsService) {
    $scope.posts = [];

    $scope.totalItems = 0;
    $scope.currentPage = 1;
    $scope.itemsPerPage = 20;
    $scope.maxSize = 5;
    postsService.getPosts(1, 20, 0).
      success(function(data, status, headers, config) {
        $scope.posts = data.data.posts;
        $scope.totalItems = data.data.total_count;
      }).
      error(function(data, status, headers, config) {
        console.log(data);
      });

    $scope.pageChanged = function() {
      postsService.getPosts($scope.currentPage, 20, 0).
      success(function(data, status, headers, config) {
        $scope.posts = data.data.posts;
      }).
      error(function(data, status, headers, config) {
        console.log(data);
      });
      $log.log('Page changed to: ' + $scope.currentPage);
    };

    $scope.delPost = function(id) {
			console.log(this);
			if(confirm('确定删除吗')) {
				postsService.delPost(id).
					success(function(data, status, headers, config) {
						if (data.status === 'destroied') {
							for (var i = $scope.posts.length - 1; i >= 0; i--) {
								if ($scope.posts[i].id == id) {
									$scope.posts.splice(i, 1);
								}
							}
							alert('删除成功');
						} else {
							alert('删除失败');
						}
					}).
					error(function(data, status, headers, config) {
						console.log(data);
					});
			}
    };
  }]);
