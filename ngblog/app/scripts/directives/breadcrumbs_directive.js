'use strict';

angular.module('ngblogApp').directive('breadcrumbs', function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'views/directives/breadcrumbs.html'
  };
});
