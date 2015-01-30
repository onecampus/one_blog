'use strict';

/**
 * @ngdoc filter
 * @name ngblogApp.filter:postFilter
 * @function
 * @description
 * # postFilter
 * Filter in the ngblogApp.
 */
angular.module('ngblogApp')
  .filter('postFilter', function () {
    return function (input) {
      return 'postFilter filter: ' + input;
    };
  });
