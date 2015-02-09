'use strict';

/**
 * @ngdoc function
 * @name ngblogApp.controller:UserEditCtrl
 * @description
 * # UserEditCtrl
 * Controller of the ngblogApp
 */
angular.module('ngblogApp')
  .controller('UserEditCtrl', ['$scope', '$log', 'usersService', '$routeParams', '$controller', function($scope, $log, usersService, $routeParams, $controller) {
    $scope.crumbs = [{
      anchor: '/#admin/users',
      menu: '所有用户'
    }, {
      anchor: '/#admin/users/' + $routeParams.userId,
      menu: '编辑用户'
    }];

    usersService.getUserById($routeParams.userId).
      /* jshint camelcase: false */
    success(function(data) {
      $scope.user = data.user;
    });


    $scope.updateUser = function(id) {
      /* jshint camelcase: false */
      var user = {
        id: id,
        name: $scope.user.name,
        email: $scope.user.email,
        password: $scope.user.password,
      };
      usersService.updateUser(user).
      success(function(data) {
        if (data.status === 'updated') {
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
