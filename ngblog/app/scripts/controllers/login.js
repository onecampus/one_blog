'use strict';

/**
 * @ngdoc function
 * @name ngblogApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ngblogApp
 */
angular.module('ngblogApp')
  .controller('LoginCtrl', ['$scope', 'AuthService', function ($scope, AuthService) {
    $scope.user = {
      email: '',
      password: '',
    };
    $scope.login = function() {
      var _loginUser = {
        login: $scope.user
      };
      console.log(_loginUser);
      AuthService.login(_loginUser).
        success(function(data, status, headers, config) {
          console.log(data);
          if(data.auth_token) {
            alert('登陆成功');
          } else if(data.error) {
            alert('用户名或者密码错误, 请重新输入');
          }
        }).
        error(function(data, status, headers, config) {
          console.log(data);
        });
    };
  }]);
