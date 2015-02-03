'use strict';

/**
 * @ngdoc function
 * @name ngblogApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ngblogApp
 */
angular.module('ngblogApp')
  .controller('PostNewCtrl', ['$scope', '$http', 'postsService', '$location', function($scope, $http, postsService, $location) {
    $scope.isCollapsed = true;
    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.opened = true;
    };

    $scope.tags = [];
    $scope.loadTags = function(query) {
      return $http.get('/api/v1/post/tags?query=' + query);
    };
    $scope.markdown = '';

    $scope.addPost = function() {
      var tagsObj = $scope.tags;
      var tagList = [];
      for(var i = 0,len = tagsObj.length; i < len; i++) {
        console.log(tagsObj[i]);
        tagList.push(tagsObj[i].text);
      }
      var post = {
        title: $scope.title,
        summary: $scope.summary,
        content: $scope.content,
        markdown: $scope.markdown,
        author: $scope.author,
        img: $scope.img,
        is_recommend: $scope.is_recommend,
        is_published: $scope.is_published,
        can_comment: $scope.can_comment,
        tag_list: tagList
      }
      console.log($scope.tags);
      console.log(tags);
      console.log(post);
      postsService.createPost(post).
      success(function(data, status, headers, config) {
        console.log(data);
        if (data.status === 'created') {
          $location.path('/admin/posts').replace();
        } else {
          alert('创建失败');
        }
      }).
      error(function(data, status, headers, config) {
        console.log(data);
      });
    };
  }]);
