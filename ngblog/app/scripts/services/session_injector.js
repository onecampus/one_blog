'use strict';

/**
 * @ngdoc service
 * @name ngblogApp.SessionInjector
 * @description
 * # postService
 * Service in the ngblogApp.
 */
angular.module('ngblogApp')
  .factory('SessionInjector', ['SessionService', '$injector', '$window', function(SessionService, $injector, $window) {
    var sessionInjector = {
      request: function(config) {
        if (SessionService.authToken !== null && SessionService.authToken !== undefined) {
          $injector.get('$http').defaults.headers.common.Authorization = SessionService.authToken;
        }
        return config;
      },
      response: function(response) {
        return response;
      },
      responseError: function(rejection) {
        if (rejection.status === 401 || rejection.status === 418 || rejection.status === 419) {
          $window.location.href = '/#/login';
        }
        return rejection;
      }
    };
    return sessionInjector;
  }]);
