'use strict';

var app = angular.module('app');
/* Lists Controller */

app.controller('ListController', function($scope, $http, $window, $localStorage, ListsService, UsersService) {
  $scope.currentPage = 1;
  $scope.reposPageCount = 1;
  $scope.status = 'Type you queries in the search bar.';

  $scope.fetchRepos = function(keyword) {
    $scope.status = 'Loading...';

    var data = {
      keyword: keyword,
      page: $scope.reposPageCount
    };
    // Fetching the lists of repositories
    ListsService.getLists(data).then(function(response) {
      $scope.status = 'Select a repository';
      $scope.repos = response;
      $scope.reposPageCount++;

      if (!$scope.repos.items.length) {
        $scope.status = 'No repositories found.';
      }
    }, function(x) {
      $scope.status = x.data.error;
    });
  };

  $scope.fetchContributors = function(contributors_url, page) {
    $window.scrollTo(0, 0); // Can use $anchorScroll() instead
    $scope.status = 'Loading...'
    $scope.contributors_url = contributors_url;

    var data = {
      contributors_url: $scope.contributors_url,
      page: page,
      per_page: 10
    };

    UsersService.getUserDetails(data).then(function(response) {
      $scope.users = response;
      $scope.status = false;

      if (!$scope.users.length) {
        $scope.status = 'No contributors found.';
      }
    }, function(x) {
      $scope.status = x.data.error;
    });
  };

  $scope.paginate = function(page) {
    $scope.fetchContributors($scope.contributors_url, page);
  };

  $scope.follow = function(index, username) {
    if ($localStorage.token) {
      var data = {
        username: username,
        token: $localStorage.token
      };

      // Follow a user
      UsersService.follow(data).then(function(response) {
        $scope.users[index].follow = 'Unfollow';
      }, function(x) {
        $scope.status = x.data.message + '. Try Github Login again.';
      });
    } else {
      $scope.status = 'Please Login to Github to follow user(s).'
    }
  };

  $scope.followAll = function() {
    for (var i = 0; i < $scope.users.length; i++) {
      $scope.follow(i, $scope.users[i].login);
    }
  };

  $scope.authenticate = function() {
    // Load the GitHub login page
    $window.location.href = ListsService.authorize();
  };

  $scope.$watch(function() {
    return $window.location.href;
  }, function(url) {
    if ($window.location.search) {
      // Get the access_token for the user
      UsersService.getToken(getAuthCode(url)).then(function(response) {
        // Store the token
        $localStorage.token = response;
      }, function(x) {
        $scope.status = 'Authentication Error.';
      });
    }
  });

  function getAuthCode(url) {
    return url.match(/[&\?]code=([\w\/\-]+)/)[1];
  }

});
