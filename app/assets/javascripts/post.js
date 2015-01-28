angular.module('postApp', [])
  .controller('PostController', ['$scope', function($scope) {
    $scope.posts = [{
      title: 'learn angular',
      done: true
    }, {
      title: 'build an angular app',
      done: false
    }];

    $scope.addPost = function() {
      $scope.posts.push({
        title: $scope.postText,
        done: false
      });
      $scope.postText = '';
    };

    $scope.remaining = function() {
      var count = 0;
      angular.forEach($scope.posts, function(post) {
        count += post.done ? 0 : 1;
      });
      return count;
    };

    $scope.archive = function() {
      var oldPosts = $scope.posts;
      $scope.posts = [];
      angular.forEach(oldPosts, function(post) {
        if (!post.done) $scope.posts.push(post);
      });
    };
  }]);
