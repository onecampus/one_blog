'use strict';

/**
 * @ngdoc function
 * @name ngblogApp.controller:PostNewCtrl
 * @description
 * # PostNewCtrl
 * Controller of the ngblogApp
 */
angular.module('ngblogApp')
  .controller('PostNewCtrl', ['$scope', '$http', 'postsService', '$location', 'FileUploader', 'AuthService', '$window', 'adminNavService', function($scope, $http, postsService, $location, FileUploader, AuthService, $window, adminNavService) {
    $scope.crumbs = [{
      anchor: '/#admin/posts',
      menu: '所有文章'
    }, {
      anchor: '/#admin/posts/new',
      menu: '添加文章'
    }];
    $scope.navacitves = {
      postsActive: false,
      newpostActive: true,
      adduserActive: false,
      usersActive: false
    };
    $scope.isCollapsed = true;
    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.opened = true;
    };

    $scope.post = {};
    $scope.post.markdown = '';
    $scope.markdown = function(ngModel) {
      marked.setOptions({
        highlight: function(code) {
          return hljs.highlightAuto(code).value;
        }
      });
      return marked(ngModel);
    };

    $scope.post.img = '';
    $scope.uploader = new FileUploader({
      url: '/api/v1/posts/image/uploader',
      autoUpload: true,
      onSuccessItem: function(item, response) {
        if (response.state === 'success') {
          $scope.post.img = response.url;
        } else {
          alert('上传错误');
        }
      }
    });

    $scope.tags = [];
    $scope.loadTags = function() {
      // return $http.get('/api/v1/post/tags?query=' + query);
    };

    $scope.addPost = function() {
      var tagsObj = $scope.post.tags;
      var tagList = [];
      for (var i = 0, len = tagsObj.length; i < len; i++) {
        tagList.push(tagsObj[i].text);
      }
      /* jshint camelcase: false */
      var _post = {
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
      };
      postsService.createPost(_post).
      success(function(data) {
        if (data.status === 'created') {
          $location.path('/admin/posts').replace();
        } else {
          alert('创建失败');
        }
      });
    };
    $scope.logout = function() {
      adminNavService.logout();
    };
  }]);
