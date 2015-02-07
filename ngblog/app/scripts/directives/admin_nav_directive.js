'use strict';

angular.module('ngblogApp').directive('navmenu', function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'views/directives/nav.html'
  };
});
