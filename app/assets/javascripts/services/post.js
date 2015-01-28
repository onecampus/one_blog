angular.module('AngularRails')
  .service('PostService', function($http) {
    var _posts = [];
		this.getPosts = function() {
			return _posts;
		}
  });
