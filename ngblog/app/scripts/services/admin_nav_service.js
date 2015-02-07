'use strict';

/**
 * @ngdoc service
 * @name ngblogApp.postService
 * @description
 * # navService
 * Service in the ngblogApp.
 */

 angular.module('ngblogApp')
   .factory('adminNavService',['AuthService', '$window', function(AuthService, $window){
     return {
       logout: function(){
         AuthService.logout();
         $window.location.href = '/';
       }
     }

   }]);
