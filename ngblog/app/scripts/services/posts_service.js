'use strict';

/**
 * @ngdoc service
 * @name ngblogApp.postService
 * @description
 * # postService
 * Service in the ngblogApp.
 */
angular.module('ngblogApp')
  .factory('postsService', ['$http', '$q', function($http, $q) {
    // $http.defaults.headers.common.Authorization = 'Basic qQ_MU5nDjhSPxFTM1TWhyg';
    return {
      getPosts: function() {
        return $http.get('/api/v1/posts');
      },
      getPostById: function(id) {
        return $http.get('/api/v1/posts/' + id);
      },
      createPost: function(post) {
        return $http.post('/api/v1/posts', {
          post: post
        });
      },
      delPost: function(id) {
        return $http.delete('/api/v1/posts/' + id);
      },
      updatePost: function(post) {
        return $http.patch('/api/v1/posts/' + post.id, {
          post: post
        });
      }
    };
  }]);
