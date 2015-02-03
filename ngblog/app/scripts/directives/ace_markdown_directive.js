'use strict';

angular.module('ngblogApp')
  .directive('ace', function() {
    return {
      require: 'ngModel',
      link: function(scope, elem, attrs, ngModel) {
        var editor = ace.edit(elem[0]);
        editor.setTheme('ace/theme/monokai');
        editor.getSession().setMode('ace/mode/markdown');
        editor.setShowPrintMargin(false);
        editor.setOptions({
          fontSize: '10pt'
        });
        editor.on('change', function(e) {
          scope.$apply(function() {
            ngModel.$setViewValue(editor.getValue());
          });
        });
        ngModel.$parsers.push(function(value) {
          marked.setOptions({
            highlight: function (code) {
              return hljs.highlightAuto(code).value;
            }
          });
          return marked(value);
        });
      }
    };
  });
