'use strict';

/**
 * @ngdoc function
 * @name ngblogApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ngblogApp
 */
angular.module('ngblogApp')
  .controller('AdminPostsCtrl', ['$scope', '$log', 'postsService', 'AuthService', '$window', function($scope, $log, postsService, AuthService, $window) {
    $scope.crumbs = [
      {
        anchor: '/#admin/posts/new',
        menu: '添加文章'
      },
      {
        anchor: '/#admin/posts/23/edit',
        menu: '编辑文章'
      }
    ];

    $scope.navacitves =
      {
        postsActive: true,
        newpostActive: false,
        adduserActive: false,
        usersActive: false
      };

    $scope.posts = [];

    $scope.itemsPerPage = 20;
    $scope.bigTotalItems = null;
    $scope.bigCurrentPage = 1;
    $scope.maxSize = 8;
    postsService.getPosts($scope.bigCurrentPage, $scope.itemsPerPage, 0).
      /* jshint camelcase: false */
      success(function(data) {
        $scope.posts = data.data.posts;
        $scope.bigTotalItems = data.data.total_count;
      }).
      error(function(data) {
        console.log(data);
      });

    $scope.pageChanged = function() {
      postsService.getPosts($scope.bigCurrentPage, $scope.itemsPerPage, 0).
      success(function(data) {
        $scope.posts = data.data.posts;
      }).
      error(function(data) {
        console.log(data);
      });
      $log.log('Page changed to: ' + $scope.bigCurrentPage);
    };

    $scope.delPost = function(id) {
      console.log(this);
      if(confirm('确定删除吗')) {
        postsService.delPost(id).
          success(function(data) {
            if (data.status === 'destroied') {
              for (var i = $scope.posts.length - 1; i >= 0; i--) {
                if ($scope.posts[i].id === id) {
                  $scope.posts.splice(i, 1);
                }
              }
              alert('删除成功');
            } else {
              alert('删除失败');
            }
          }).
          error(function(data) {
            console.log(data);
          });
      }
    };
    $scope.logout = function(){
      AuthService.logout();
      $window.location.href = '/';
    };
  }]);
