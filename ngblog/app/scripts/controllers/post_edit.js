'use strict';

/**
 * @ngdoc function
 * @name ngblogApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ngblogApp
 */
angular.module('ngblogApp')
  .controller('PostEditCtrl', ['$scope', 'postsService', function($scope, postsService) {

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
      postsService.updatePost(post).
      success(function(data, status, headers, config) {
        console.log(data);
        if (data.status === 'updated') {
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
