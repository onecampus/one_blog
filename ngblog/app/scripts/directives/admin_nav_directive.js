'use strict';

angular.module('ngblogApp')
.directive('navMenu', function() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      'close': '&onClose'
    },
    templateUrl: 'views/directives/nav.html'
  };
});
