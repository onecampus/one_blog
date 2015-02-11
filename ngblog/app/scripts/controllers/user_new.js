'use strict';

/**
 * @ngdoc function
 * @name ngblogApp.controller:UsersNewCtrl
 * @description
 * # UsersNewCtrl
 * Controller of the ngblogApp
 */
angular.module('ngblogApp')
  .controller('UsersNewCtrl', ['$controller', '$scope', '$http', 'FileUploader', 'usersService', '$location', 'AuthService', '$window', 'adminNavService', function($controller, $scope, $http, FileUploader, usersService, $location, AuthService, $window, adminNavService) {
    $scope.crumbs = [{
      anchor: '/#admin/users',
      menu: '所有用户'
    }, {
      anchor: '/#admin/users/new',
      menu: '添加用户'
    }];
    $scope.navacitves = {
      postsActive: false,
      newpostActive: false,
      adduserActive: true,
      usersActive: false,
      passwordActive: false,
      avatarActive: false
    };

    $scope.user = {};
    $scope.user.avatar = '';
    $scope.uploader = new FileUploader({
      url: '/api/v1/users/image/uploader',
      autoUpload: true,
      onSuccessItem: function(item, response) {
        if (response.state === 'success') {
          $scope.user.avatar = response.url;
        } else {
          alert('上传错误');
        }
      }
    });
    $scope.addUser = function() {
      var _user = {
        name: $scope.user.name,
        email: $scope.user.email,
        password: $scope.user.password,
        avatar: $scope.user.avatar
      };
      console.log(_user);
      usersService.createUsers(_user).
        success(function(data) {
          if (data.status === 'created') {
            $location.path('/admin/users').replace();
          } else {
            alert('创建失败');
          }
        });
    };
    $controller('BaseCtrl', {
      $scope: $scope
    });
    $scope.logout = function() {
      adminNavService.logout();
    };
  }]);
