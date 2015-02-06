'use strict';

angular.module('ngblogApp')
.directive('navMenu', function() {
  return {
    restrict: 'E',
    scope: {
      'close': '&onClose'
    },
    templateUrl: 'views/admin_left.html'
  };
});
