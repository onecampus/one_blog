'use strict';

/**
 * @ngdoc function
 * @name ngblogApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ngblogApp
 */
angular.module('ngblogApp')
  .controller('LoginCtrl', ['$scope', 'AuthService', 'SessionService', '$location', function ($scope, AuthService, SessionService, $location) {
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
        success(function(data) {
          console.log(data);
          /*jshint camelcase: false */
          if(data.auth_token && data.current_user) {
            alert('登陆成功');
            SessionService.setCurrentUser(data.current_user);
            SessionService.setAuthToken(data.auth_token);
            $location.path(SessionService.backUrl || '/');
            SessionService.setBackUrl(null);
          } else if(data.error) {
            alert('用户名或者密码错误, 请重新输入');
          }
        }).
        error(function(data) {
          console.log(data);
        });
    };
  }]);
