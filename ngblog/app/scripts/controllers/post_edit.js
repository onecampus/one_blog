'use strict';

/**
 * @ngdoc function
 * @name ngblogApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ngblogApp
 */
angular.module('ngblogApp')
  .controller('PostEditCtrl', ['$scope', 'postsService', '$routeParams', '$location', function($scope, postsService, $routeParams, $location) {
    $scope.isCollapsed = true;
    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.opened = true;
    };
    postsService.getPostById($routeParams.postId).
      success(function(data, status, headers, config) {
        $scope.post = data.post;
        var _tags = [];
        var _tagList = $scope.post.tags;
        for(var i = 0, len = _tagList.length; i < len; i++) {
          var _tagObj = {
            text: _tagList[i].name
          }
          _tags.push(_tagObj);
        }
        $scope.post.tags = _tags;
        $scope.post.content = 'segegeghreh5e5h5h5h5j5j';
      }).
      error(function(data, status, headers, config) {
        console.log(data);
      });


    $scope.updatePost = function(id) {
      var tagsObj = $scope.post.tags;
      var tagList = [];
      for(var i = 0,len = tagsObj.length; i < len; i++) {
        console.log(tagsObj[i]);
        tagList.push(tagsObj[i].text);
      }
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
        can_comment: $scope.post.can_comment,
        tag_list: tagList
      }
      postsService.updatePost(post).
        success(function(data, status, headers, config) {
          console.log(data);
          if (data.status === 'updated') {
            $location.path('/admin/posts').replace();
          } else {
            alert('更新失败');
          }
        }).
        error(function(data, status, headers, config) {
          console.log(data);
        });
    };

  }]);
