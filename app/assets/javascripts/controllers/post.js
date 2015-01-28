angular.module('AngularRails')
  .controller('PostCtrl', function($scope, postService) {
    $scope.posts = [];
  });
