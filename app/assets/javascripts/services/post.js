angular.module('AngularRails')
  .factory('postService', ['$http', '$q', function($http, $q) {
		'use strict';
		return {
		  getPosts: function() {
				return $http.get('/api/v1/posts');
			},
	    createPost: function() {}
		};
  }]);
