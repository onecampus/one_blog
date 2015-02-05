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
      getPosts: function(page, perPage, offset) {
        page = typeof page !== 'undefined' ? page : 1;
        perPage = typeof perPage !== 'undefined' ? perPage : 20;
        offset = typeof offset !== 'undefined' ? offset : 0;
        var _url = '?page=' + page + '&per_page=' + perPage + '&offset=' + offset;
        return $http.get('/api/v1/posts' + _url);
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
      },
      searchPost: function(keyword) {
        return $http.get('/api/v1/posts/search?keyword=' + keyword);
      }
    };
  }]);
