'use strict';

/**
 * @ngdoc service
 * @name ngblogApp.AuthService
 * @description
 * # postService
 * Service in the ngblogApp.
 */
angular.module('ngblogApp')
  .factory('AuthService', ['$http', function ($http) {
    var authService = {};
    // 登陆, 返回authToken, expirationTime
    authService.login = function (credentials) {
      return $http.post('/api/v1/users/auth', credentials);
    };

    // 是否登陆
    authService.isLoggedIn = function(currentUser) {
      return (currentUser) ? currentUser : false;
    };

    authService.setCurrentUser = function(scope, currentUser){
      scope.currentUser = currentUser;
    };

    // 认证
    authService.isAuthenticated = function (currentUser) {
      return !!currentUser;
    };

    // 授权
    authService.isAuthorized = function() {
      return authService.isAuthenticated();
    };

    return authService;
  }]);
