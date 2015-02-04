'use strict';

angular.module('ngblogApp')
  .directive('ueditor', ['$timeout', '$sce', function($timeout, $sce) {
    return {
      restrict: 'AE',
      replace: true,
      transclued: true,
      scope: {},
      template: '',
      require: 'ngModel',
      link: function(scope, element, attrs, ngModel) {
				/*
				var ueditor = UE.getEditor(element[0], {
					initialFrameWidth: '100%',
					initialFrameHeight: '300',
					autoHeightEnabled: true
				});
				if (!ngModel) {
					return;
				}
				ueditor.addListener('ready', function() {
					console.log(ngModel.$viewValue);
					console.log($sce.trustAsHtml(ngModel.$viewValue));
					ngModel.$render = function() {
						ueditor.setContent(ngModel.$viewValue);
					};
				});
				// Model数据更新时，更新百度UEditor
				ueditor.addListener('contentChange', function() {
					$timeout(function() {
						ngModel.$setViewValue(ueditor.getContent());
						if(!scope.$$phase) {
						  scope.$apply();
						}
					}, 0);
				});
				*/
				if (!ngModel) {
					return;
				}
        var _self = this,
          _initContent,
          editor,
          editorReady = false;
        var fexUE = {
          initEditor: function() {
            _self = this;
            if (typeof UE !== 'undefined') {
              editor = new UE.ui.Editor({
								initialFrameWidth: '100%',
								initialFrameHeight: '300',
								autoHeightEnabled: true,
								elementPathEnabled: false
              });

              editor.render(element[0]);
              editor.ready(function() {
                editorReady = true;
                _self.setContent(_initContent);

                editor.addListener('contentChange', function() {
                  scope.$apply(function() {
                    ngModel.$setViewValue(editor.getContent());
                  });
                });
              });
            }
          },
          setContent: function(content) {
            if (editor && editorReady) {
              editor.setContent(content);
            }
          }
        };

        /**
         * 当Model改变值得时候赋值。
         */
        ngModel.$render = function() {
          _initContent = ngModel.$isEmpty(ngModel.$viewValue) ? '' : ngModel.$viewValue;
          fexUE.setContent(_initContent);
        };

        fexUE.initEditor();
      }
    };
  }]);
