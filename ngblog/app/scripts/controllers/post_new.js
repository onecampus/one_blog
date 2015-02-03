'use strict';

/**
 * @ngdoc function
 * @name ngblogApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ngblogApp
 */
angular.module('ngblogApp')
  .controller('PostNewCtrl', ['$scope', '$http', 'postsService', function($scope, $http, postsService) {
    $scope.isCollapsed = true;
    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.opened = true;
    };

    $scope.tags = [{
      text: 'just'
    }, {
      text: 'some'
    }, {
      text: 'cool'
    }, {
      text: 'tags'
    }];
    $scope.loadTags = function(query) {
      return $http.get('/api/v1/post/tags?query=' + query);
    };

    $scope.addPost = function() {
      var post = {
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
      postsService.createPost(post).
      success(function(data, status, headers, config) {
        console.log(data);
        if (data.status === 'created') {
          $scope.post.title = '';
          $scope.post.summary = '';
          $scope.post.content = '';
          $scope.post.markdown = '';
          $scope.post.author = '';
          $scope.post.img = '';
          $scope.post.is_recommend = '';
          $scope.post.is_published = '';
          $scope.post.can_comment = '';
          $location.path('/posts').replace();
        } else {
          alert('创建失败');
        }
      }).
      error(function(data, status, headers, config) {
        console.log(data);
      });
    };
  }]);
