'use strict';

/**
 * @ngdoc overview
 * @name ngblogApp
 * @description
 * # ngblogApp
 *
 * Main module of the application.
 */
angular
  .module('ngblogApp', [
    'angular-loading-bar',
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'ngTagsInput',
    'angularFileUpload',
    'LocalStorageModule',
    'angular-carousel'
  ])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('SessionInjector');
  })
  .config(function (localStorageServiceProvider) {
    localStorageServiceProvider
      .setPrefix('ngblogApp')
      .setStorageType('localStorage')
      .setStorageCookie(10, '/')
      .setNotify(true, true);
  })
  .run(function($rootScope, $location, SessionService) {
    $rootScope.$on('$routeChangeStart', function(event, next) {
      var _needAdmin = [
        'views/admin_new_post.html',
        'views/admin_edit_post.html',
        'views/admin_posts.html'
      ];
      if(_.include(_needAdmin, next.templateUrl)) {
        if(SessionService.authToken === null) {
          if(next.templateUrl === 'views/login.html') {
            // now is in the login page.
          } else {
            SessionService.setBackUrl($location.$$path);
            $location.path('/login');
          }
        }
      }
    });
  })
  .config(['$routeProvider', 'cfpLoadingBarProvider', '$locationProvider', function($routeProvider, cfpLoadingBarProvider, $locationProvider) {
    cfpLoadingBarProvider.includeSpinner = false;

    var _isNotMobile = (function() {
      return !SmartPhone.isAny();
    })();
    $routeProvider
      .when('/', {
        templateUrl: (_isNotMobile) ? 'views/main.html' : 'views/mobile/main.html',
        controller: 'MainCtrl'
      })
      .when('/posts', {
        templateUrl: 'views/posts.html',
        controller: 'PostsCtrl'
      })
      .when('/posts/:postId', {
        templateUrl: 'views/show_post.html',
        controller: 'PostShowCtrl'
      })
      .when('/admin/posts', {
        templateUrl: 'views/admin_posts.html',
        controller: 'AdminPostsCtrl',
        reloadOnSearch: false
      })
      .when('/admin/posts/new', {
        templateUrl: 'views/admin_new_post.html',
        controller: 'PostNewCtrl',
        reloadOnSearch: false
      })
      .when('/admin/posts/:postId', {
        templateUrl: 'views/admin_edit_post.html',
        controller: 'PostEditCtrl'
      })
      .when('/search/posts', {
        templateUrl: 'views/search_posts.html',
        controller: 'SearchPostsCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  }]);
