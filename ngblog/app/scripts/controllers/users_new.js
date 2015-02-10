'use strict';

/**
 * @ngdoc function
 * @name ngblogApp.controller:UsersNewCtrl
 * @description
 * # UsersNewCtrl
 * Controller of the ngblogApp
 */
angular.module('ngblogApp')
  .controller('UsersNewCtrl', ['$scope', '$http', 'usersService', '$location', 'AuthService', '$window', 'adminNavService', function($scope, $http, usersService, $location, AuthService, $window, adminNavService) {
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
      usersActive: false
    };

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
    $scope.logout = function() {
      adminNavService.logout();
    };
  }]);
