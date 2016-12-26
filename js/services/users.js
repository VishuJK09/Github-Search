'user strict';

var app = angular.module('app');
/* Users Service */

app.factory('UsersService', function($http) {

  return {

    getUserDetails: function(contributors_url) {
      return $http.get(contributors_url).then(function(response) {
        return response.data;
      });
    },

    follow: function(username) {
      return $http.put('https://api.github.com/user/following/' + username).then(function(response) {
        return response.data;
      });
    }

  }
});
