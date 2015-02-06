'use strict';

angular.module('ngblogApp')
.directive('myDialog', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      'close': '&onClose'
    },
    templateUrl: 'views/admin_left.html'
  };
});
