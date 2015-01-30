'use strict';

describe('Directive: ueditorDirective', function () {

  // load the directive's module
  beforeEach(module('ngblogApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ueditor-directive></ueditor-directive>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the ueditorDirective directive');
  }));
});
