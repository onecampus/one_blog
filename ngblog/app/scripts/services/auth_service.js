'use strict';

/**
 * @ngdoc service
 * @name ngblogApp.AuthService
 * @description
 * # postService
 * Service in the ngblogApp.
 */
angular.module('ngblogApp')
  .factory('AuthService', ['$http', 'SessionService', 'localStorageService', function ($http, SessionService, localStorageService) {
    var authService = {};

    // 登陆, 返回authToken, expirationTime
    authService.login = function(credentials) {
      return $http.post('/api/v1/users/auth', credentials);
    };

    // 退出
    authService.logout = function() {
      SessionService.setCurrentUser = null;
      SessionService.setAuthToken = null;
      localStorageService.remove("currentUser");
      localStorageService.remove("authToken");
    };

    return authService;
  }]);
