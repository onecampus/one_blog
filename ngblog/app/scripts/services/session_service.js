'use strict';

/**
 * @ngdoc service
 * @name ngblogApp.SessionService
 * @description
 * # SessionService
 * Service in the ngblogApp.
 */
angular.module('ngblogApp')
  .factory('SessionService', ['localStorageService', function(localStorageService) {
    if (!localStorageService.isSupported) {
      alert('不支持localStorage');
    }
    var sessionService = {
      currentUser: localStorageService.get('currentUser'),
      authToken: localStorageService.get('authToken'),
      backUrl: null,

      // 是否登陆
      isLoggedIn: function() {
        return (sessionService.currentUser !== null) ? true : false;
      },

      setCurrentUser: function(currentUser) {
        localStorageService.set('currentUser', currentUser);
        sessionService.currentUser = currentUser;
      },
      getCurrentUser: function() {
        return sessionService.currentUser;
      },

      setAuthToken: function(authToken) {
        localStorageService.set('authToken', authToken);
        sessionService.authToken = authToken;
      },
      getAuthToken: function() {
        return sessionService.authToken;
      },

      setBackUrl: function(url) {
        sessionService.backUrl = url;
      },

      getBackUrl: function() {
        return sessionService.backUrl;
      }
    };

    return sessionService;
  }]);
