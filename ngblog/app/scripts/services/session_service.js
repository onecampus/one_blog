'use strict';

/**
 * @ngdoc service
 * @name ngblogApp.AuthService
 * @description
 * # postService
 * Service in the ngblogApp.
 */
angular.module('ngblogApp')
  .factory('SessionService', function() {
    var sessionService = {
      currentUser: null,
      authToken: null,

      // 是否登陆
      isLoggedIn: function() {
        return (sessionService.currentUser !== null) ? true : false;
      },

      setCurrentUser: function(currentUser) {
        sessionService.currentUser = currentUser;
      },
      getCurrentUser: function() {
        return sessionService.currentUser;
      },

      setAuthToken: function(authToken) {
        sessionService.authToken = authToken;
      },
      getAuthToken: function() {
        return sessionService.authToken;
      },
    };

    return sessionService;
  });
