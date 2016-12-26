'use strict';

var app = angular.module('app');
/* Lists Controller */

app.controller('ListController', function($scope, $http, ListsService, UsersService) {
  $scope.currentPage = 0;
  $scope.pageSize = 10;
  $scope.status = 'Type you queries in the search bar.';

  $scope.fetchContributors = function(keyword) {
    $scope.status = 'Loading...'
    // Fetching the lists of repositories
    ListsService.getLists(keyword).then(function(response) {
      // Selecting the repository that has most stars and retrieve its contributors
      UsersService.getUserDetails(response.items[0].contributors_url).then(function(response) {
        $scope.users = response;
        $scope.total = $scope.users.length;
        $scope.status = false;

        if (!$scope.total) {
          $scope.status = 'No contributors found.';
        }
      });
    }, function(x) {
      $scope.status = x.data.error;
    });
  };

  $scope.numberOfPages = function(){
    return Math.ceil($scope.total/$scope.pageSize);
  }

  $scope.follow = function(index, username) {
    UsersService.follow(username).then(function(response) {
      $scope.users[index].follow = 'Unfollow';
    }, function(x) {
      $scope.status = x.data.message;
    });
  };

});

// Filter used for Pagination
app.filter('startFrom', function() {
  return function(input, start) {
    start = +start;
    return input.slice(start);
  }
});
