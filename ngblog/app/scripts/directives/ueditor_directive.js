'use strict';

angular.module('ngblogApp')
  .directive('ueditor', ['$timeout', function($timeout) {
    return {
      restrict: 'AE',
      replace: true,
      transclued: true,
      scope: {},
      template: '',
      require: 'ngModel',
      link: function(scope, element, attrs, ngModel) {

				var ueditor = UE.getEditor(element[0], {
					initialFrameWidth: '100%',
					initialFrameHeight: '300',
					autoHeightEnabled: true
				});
				if (!ngModel) {
					return;
				}
				ueditor.addListener('ready', function() {
					ngModel.$render = function() {
						ueditor.setContent(ngModel.$viewValue);
					};
				});
				// Model数据更新时，更新百度UEditor
				ueditor.addListener('contentChange', function() {
					$timeout(function() {
  					scope.$apply(function() {
  						ngModel.$setViewValue(ueditor.getContent());
  					});
					}, 0);
				});
      }
    };
  }]);
