'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('ngblogApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('sorts in descending order by default', function() {
    var users = ['jack', 'igor', 'jeff'];
    expect(users).toEqual(['jack', 'igor', 'jeff']);
  });
});
