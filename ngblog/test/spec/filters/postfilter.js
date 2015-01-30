'use strict';

describe('Filter: postFilter', function () {

  // load the filter's module
  beforeEach(module('ngblogApp'));

  // initialize a new instance of the filter before each test
  var postFilter;
  beforeEach(inject(function ($filter) {
    postFilter = $filter('postFilter');
  }));

  it('should return the input prefixed with "postFilter filter:"', function () {
    var text = 'angularjs';
    expect(postFilter(text)).toBe('postFilter filter: ' + text);
  });

});
