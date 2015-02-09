'use strict';

angular.module('ngblogApp')
  .directive('ueditor', ['$timeout', function($timeout) {
    return {
      restrict: 'AE',
      require: '?ngModel',
      link: function(scope, element, attrs, ngModel) {

        if (!ngModel || UE === undefined) {
          return;
        }
        var ueditor = UE.getEditor(element[0], {
          initialFrameWidth: '100%',
          initialFrameHeight: '300',
          autoHeightEnabled: true
        });

        var setModelData = function() {
          var data = ueditor.getContent();
          if (data === '') {
            return null;
          }
          if (data !== ngModel.$viewValue) {
            if (!scope.$root.$$phase) {
              $timeout(function() {
                scope.$apply(function() {
                  ngModel.$setViewValue(ueditor.getContent());
                });
              }, 0);
            }
          }
        };
        if (ueditor !== undefined && ueditor !== null) {
          ueditor.addListener('ready', function() {
            ngModel.$render = function() {
              ueditor.setContent(ngModel.$viewValue || '');
            };
          });

          ueditor.addListener('blur', setModelData);

          // ueditor.addListener('contentChange', setModelData);
        }
      }
    };
  }]);
