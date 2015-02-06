'use strict';

/**
 * @ngdoc function
 * @name ngblogApp.controller:MainCtrl
 * @description
 * # AdminIndexCtrl
 * Controller of the ngblogApp
 */
angular.module('ngblogApp')
  .controller('AdminIndexCtrl', ['$scope', '$http', 'postsService', '$location', 'FileUploader', 'AuthService', '$window', '$log', function($scope, $http, postsService, $location, FileUploader, AuthService, $window, $log) {
    /*
    admin_new_post
    */
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
        highlight: function (code) {
          return hljs.highlightAuto(code).value;
        }
      });
      return marked(ngModel);
    };

    $scope.post.img = '';
    $scope.uploader = new FileUploader({
      url: '/api/v1/posts/image/uploader',
      autoUpload: true,
      onSuccessItem: function(item, response, status, headers) {
        console.log(response);
        if(response.state === 'success') {
          $scope.post.img = response.url;
        } else {
          alert('上传错误');
        }
      }
    });

    $scope.tags = [];
    $scope.loadTags = function(query) {
      // return $http.get('/api/v1/post/tags?query=' + query);
    };

    $scope.addPost = function() {
      var tagsObj = $scope.post.tags;
      var tagList = [];
      for(var i = 0,len = tagsObj.length; i < len; i++) {
        tagList.push(tagsObj[i].text);
      }
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

    $scope.userOut = function() {
      AuthService.logout();
      $window.location.href = '/';
    }

    /*
    posts
    */

    $scope.posts = [];

    $scope.itemsPerPage = 20;
    $scope.bigTotalItems = null;
    $scope.bigCurrentPage = 1;
    $scope.maxSize = 8;
    postsService.getPosts($scope.bigCurrentPage, $scope.itemsPerPage, 0).
      success(function(data, status, headers, config) {
        $scope.posts = data.data.posts;
        $scope.bigTotalItems = data.data.total_count;
      }).
      error(function(data, status, headers, config) {
        console.log(data);
      });

    $scope.pageChanged = function() {
      postsService.getPosts($scope.bigCurrentPage, $scope.itemsPerPage, 0).
      success(function(data, status, headers, config) {
        $scope.posts = data.data.posts;
      }).
      error(function(data, status, headers, config) {
        console.log(data);
      });
      $log.log('Page changed to: ' + $scope.bigCurrentPage);
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
