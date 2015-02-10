'use strict';

/**
 * @ngdoc function
 * @name ngblogApp.controller:UpdatePasswordCtrl
 * @description
 * # UpdatePasswordCtrl
 * Controller of the ngblogApp
 */
angular.module('ngblogApp')
  .controller('UpdatePasswordCtrl', ['$controller', '$scope', '$http', 'usersService', '$location', 'AuthService', '$window', 'adminNavService', function($controller, $scope, $http, usersService, $location, AuthService, $window, adminNavService) {
    $scope.crumbs = [{
      anchor: '/#users/password/update',
      menu: '修改密码'
    }];
    $controller('BaseCtrl', {
      $scope: $scope
    });
    $scope.navacitves = {
      postsActive: false,
      newpostActive: false,
      adduserActive: false,
      usersActive: false,
      passwordActive: true,
      avatarActive: false
    };
    console.log($scope.currentUser);
    usersService.getUserById($scope.currentUser.id).
      /* jshint camelcase: false */
      success(function(data) {
        $scope.user = data.user;
      });

    $scope.updatePassword = function(id) {
      var user = {
        id: id,
        password: $scope.user.password
      };
      usersService.updatePassword(user).
      success(function(data) {
        if (data.status === 'password_updated') {
          $location.path('/admin/users').replace();
        } else {
          alert('更新失败');
        }
      });
    };

    $scope.logout = function() {
      adminNavService.logout();
    };
  }]);
