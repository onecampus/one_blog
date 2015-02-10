'use strict';

/**
 * @ngdoc function
 * @name ngblogApp.controller:UpdateAvatarCtrl
 * @description
 * # UpdateAvatarCtrl
 * Controller of the ngblogApp
 */
angular.module('ngblogApp')
  .controller('UpdateAvatarCtrl', ['$controller', '$scope', '$http', 'usersService', '$location', 'AuthService', '$window', 'adminNavService', function($controller, $scope, $http, usersService, $location, AuthService, $window, adminNavService) {
    $scope.crumbs = [{
      anchor: '/#users/avatar/update',
      menu: '修改头像'
    }];
    $controller('BaseCtrl', {
      $scope: $scope
    });
    $scope.navacitves = {
      postsActive: false,
      newpostActive: false,
      adduserActive: false,
      usersActive: false,
      passwordActive: false,
      avatarActive: true
    };
    console.log($scope.currentUser);
    usersService.getUserById($scope.currentUser.id).
      /* jshint camelcase: false */
      success(function(data) {
        $scope.user = data.user;
      });

    $scope.updateAvatar = function(id) {
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
