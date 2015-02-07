'use strict';

angular.module('ngblogApp')
  .directive('ace', ['$timeout', function($timeout) {
    return {
      require: '?ngModel',
      link: function(scope, elem, attrs, ngModel) {
        var editor = ace.edit(elem[0]);
        editor.setTheme('ace/theme/monokai');
        editor.getSession().setMode('ace/mode/markdown');
        editor.setShowPrintMargin(false);
        editor.setOptions({
          fontSize: '10pt'
        });
        if (editor !== undefined && editor !== null) {
          ngModel.$render = function() {
            editor.setValue(ngModel.$viewValue);
          };
          editor.on('change', function() {
            $timeout(function() {
              scope.$apply(function() {
                ngModel.$setViewValue(editor.getValue());
              });
            }, 0);
          });
        }
      }
    };
  }]);
