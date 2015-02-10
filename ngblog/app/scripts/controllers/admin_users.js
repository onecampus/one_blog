'use strict';

/**
 * @ngdoc function
 * @name ngblogApp.controller:AdminUsersCtrl
 * @description
 * # AdminUsersCtrl
 * Controller of the ngblogApp
 */
angular.module('ngblogApp')
  .controller('AdminUsersCtrl', ['$controller', '$scope', '$log', 'usersService', 'AuthService', '$window', 'adminNavService', function($controller, $scope, $log, usersService, AuthService, $window, adminNavService) {
    $scope.crumbs = [{
      anchor: '/#admin/posts',
      menu: '所有用户'
    }];

    $scope.navacitves = {
      postsActive: false,
      newpostActive: false,
      adduserActive: false,
      usersActive: true
    };

    $scope.itemsPerPage = 20;
    $scope.bigTotalItems = null;
    $scope.bigCurrentPage = 1;
    $scope.maxSize = 8;
    usersService.getUsers($scope.bigCurrentPage, $scope.itemsPerPage, 0).
      /* jshint camelcase: false */
    success(function(data) {
      $scope.users = data.data.users;
      $scope.bigTotalItems = data.data.total_count;
    });

    $scope.pageChanged = function() {
      usersService.getUsers($scope.bigCurrentPage, $scope.itemsPerPage, 0).
      success(function(data) {
        $scope.users = data.data.users;
      });
    };

    $scope.delUser = function(id) {
      if (confirm('确定删除吗')) {
        usersService.delUser(id).
        success(function(data) {
          if (data.status === 'destroied') {
            for (var i = $scope.users.length - 1; i >= 0; i--) {
              if ($scope.users[i].id === id) {
                $scope.users.splice(i, 1);
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
