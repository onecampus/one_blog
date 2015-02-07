'use strict';

/**
 * @ngdoc function
 * @name ngblogApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ngblogApp
 */
angular.module('ngblogApp')
  .controller('PostEditCtrl', ['$scope', 'postsService', '$routeParams', '$location', 'FileUploader', function($scope, postsService, $routeParams, $location, FileUploader) {
    $scope.crumbs = [
      {
        anchor: '/#admin/posts',
        menu: '所有文章'
      },
      {
        anchor: '/#admin/posts/5',
        menu: '编辑文章'
      }
    ];

    $scope.isCollapsed = true;
    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.opened = true;
    };
    postsService.getPostById($routeParams.postId).
    /* jshint camelcase: false */
      success(function(data) {
        $scope.post = data.post;

        $scope.post.is_recommend = $scope.post.is_recommend === 1 ? true : false;
        $scope.post.is_published = $scope.post.is_published === 1 ? true : false;
        $scope.post.can_comment = $scope.post.can_comment === 1 ? true : false;

        $scope.markdown = function(ngModel) {
          marked.setOptions({
            highlight: function (code) {
              return hljs.highlightAuto(code).value;
            }
          });
          return marked(ngModel);
        };

        var _tags = [];
        var _tagList = $scope.post.tags;
        for(var i = 0, len = _tagList.length; i < len; i++) {
          var _tagObj = {
            text: _tagList[i].name
          };
          _tags.push(_tagObj);
        }
        $scope.post.tags = _tags;
      }).
      error(function(datag) {
        console.log(data);
      });


    $scope.updatePost = function(id) {
      var tagsObj = $scope.post.tags;
      var tagList = [];
      for(var i = 0,len = tagsObj.length; i < len; i++) {
        console.log(tagsObj[i]);
        tagList.push(tagsObj[i].text);
      }
      /* jshint camelcase: false */
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
      };
      postsService.updatePost(post).
        success(function(data) {
          console.log(data);
          if (data.status === 'updated') {
            $location.path('/admin/posts').replace();
          } else {
            alert('更新失败');
          }
        }).
        error(function(data) {
          console.log(data);
        });
    };

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

  }]);
