'use strict';

/**
 * @ngdoc function
 * @name ngblogApp.controller:UserInfoCtrl
 * @description
 * # UserInfoCtrl
 * Controller of the ngblogApp
 */
angular.module('ngblogApp')
  .controller('UserInfoCtrl', ['$scope', '$log', 'usersService', '$routeParams', '$controller', function($scope, $log, usersService, $routeParams, $controller) {
    $scope.crumbs = [{
      anchor: '/#admin/users',
      menu: '所有用户'
    }, {
      anchor: '/#admin/users/' + $routeParams.userId,
      menu: '用户详情'
    }];
    $scope.isCollapsed = true;
    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.opened = true;
    };
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