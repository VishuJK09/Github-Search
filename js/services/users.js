'user strict';

var app = angular.module('app');
/* Users Service */

app.factory('UsersService', function($http) {

  return {

    getToken: function(code) {
      // Web-service to retrieve access_token is deployed in Heroku
      return $http.post('https://githubsearch-webservice.herokuapp.com/auth/github', { code: code }).then(function(response) {
        return response.data;
      });
    },

    getUserDetails: function(data) {
      return $http.get(data.contributors_url
      + '?page=' + data.page
      + '&per_page=' + data.per_page).then(function(response) {
        return response.data;
      });
    },

    follow: function(data) {
      return $http.put('https://api.github.com/user/following/' + data.username
      + '?access_token=' + data.token.access_token).then(function(response) {
        return response.data;
      });
    }

  }
});
