'use strict';

/**
 * @ngdoc service
 * @name ngblogApp.usersService
 * @description
 * # usersService
 * Service in the ngblogApp.
 */
angular.module('ngblogApp')
  .factory('usersService', ['$http', function($http) {
    // $http.defaults.headers.common.Authorization = 'Basic qQ_MU5nDjhSPxFTM1TWhyg';
    return {
      getUsers: function(page, perPage, offset) {
        page = typeof page !== 'undefined' ? page : 1;
        perPage = typeof perPage !== 'undefined' ? perPage : 20;
        offset = typeof offset !== 'undefined' ? offset : 0;
        var _url = '?page=' + page + '&per_page=' + perPage + '&offset=' + offset;
        return $http.get('/api/v1/users' + _url);
      },
      getUserById: function(id) {
        return $http.get('/api/v1/users/' + id);
      },
      delUser: function(id) {
        return $http.delete('/api/v1/users/' + id + '/destroy');
      },
      updatePassword: function(user) {
        return $http.put('/api/v1/users/' + user.id + '/password/update', {
          user: user
        });
      },
      updateAvatar: function(user) {
        return $http.post('/api/v1/users/' + user.id + '/avatar/update', {
          user: user
        });
      },
      createUsers: function(user) {
        console.log(user);
        return $http.post('/api/v1/users/create', {
          user: user
        });
      }
    };
  }]);
