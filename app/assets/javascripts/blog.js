angular
  .module('AngularRails', [
    'ngRoute',
    'templates'
  ]).config(function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'home.html',
        controller: 'HomeCtrl'
      })
      .when('/posts', {
        templateUrl: 'posts.html',
        controller:  'PostCtrl'
      })
			.when('/posts/new', {
				templateUrl: 'new_post.html',
			  controller: 'PostCtrl'
			})
			.when('/posts/:postId', {
				templateUrl: 'post.html',
			  controller: 'PostCtrl'
			});
  });
