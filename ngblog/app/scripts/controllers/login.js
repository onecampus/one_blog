'use strict';

/**
 * @ngdoc function
 * @name ngblogApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the ngblogApp
 */
angular.module('ngblogApp')
  .controller('LoginCtrl', ['$scope', 'AuthService', 'SessionService', '$location', function($scope, AuthService, SessionService, $location) {
    $scope.user = {
      email: '',
      password: '',
    };
    $scope.login = function() {
      var _loginUser = {
        login: $scope.user
      };
      AuthService.login(_loginUser).
      success(function(data) {
        /*jshint camelcase: false */
        if (data.auth_token && data.current_user) {
          alert('登陆成功');
          SessionService.setCurrentUser(data.current_user);
          SessionService.setAuthToken(data.auth_token);
          $location.path(SessionService.backUrl || '/');
          SessionService.setBackUrl(null);
        } else if (data.error) {
          alert('用户名或者密码错误, 请重新输入');
        }
      });
    };
  }]);
