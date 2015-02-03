'use strict';

var app = angular.module('ngblogApp',[]);
var UE;
app.directive('ueditor', function() {
  return {
    restrict: 'AE',
    replace: true,
    transclued: true,
    scope: {},
    template: '',
    require: '?ngModel',
    link: function(scope, element, attrs, ngModel) {
      var ueditor = UE.getEditor(element[0], {
        initialFrameWidth: '100%',
        initialFrameHeight: '300',
        autoHeightEnabled: true
      });
      if (!ngModel) {
        return;
      }
      ueditor.on('instanceReady', function() {
        ueditor.setContent(ngModel.$viewValue);
      });
      ueditor.on('pasteState', function() {
        scope.$apply(function() {
          ngModel.$setViewValue(ueditor.getContent());
        });
      });
      // Model数据更新时，更新百度UEditor
      ngModel.$render = function() {
        ueditor.setContent(ngModel.$viewValue);
      };
      ueditor.addListener('contentChange', function() {
        setTimeout(function() {
          scope.$apply(function() {
            ngModel.$setViewValue(ueditor.getContent());
          });
        }, 0);
      });
    }
  };
});
