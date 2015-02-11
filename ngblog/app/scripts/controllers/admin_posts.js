'use strict';

/**
 * @ngdoc function
 * @name ngblogApp.controller:AdminPostsCtrl
 * @description
 * # AdminPostsCtrl
 * Controller of the ngblogApp
 */
angular.module('ngblogApp')
  .controller('AdminPostsCtrl', ['$controller', '$scope', '$log', 'postsService', 'AuthService', '$window', 'adminNavService', function($controller, $scope, $log, postsService, AuthService, $window, adminNavService) {
    $scope.crumbs = [{
      anchor: '/#admin/posts',
      menu: '所有文章'
    }];

    $scope.navacitves = {
      postsActive: true,
      newpostActive: false,
      adduserActive: false,
      usersActive: false,
      passwordActive: false,
      avatarActive: false
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
    });

    $scope.pageChanged = function() {
      postsService.getPosts($scope.bigCurrentPage, $scope.itemsPerPage, 0).
      success(function(data) {
        $scope.posts = data.data.posts;
      });
    };

    $scope.delPost = function(id) {
      if (confirm('确定删除吗')) {
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
        });
      }
    };
    $controller('BaseCtrl', {
      $scope: $scope
    });
    $scope.logout = function() {
      adminNavService.logout();
    };
  }]);
