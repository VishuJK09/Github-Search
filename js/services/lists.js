'user strict';

var app = angular.module('app');
/* Lists Service */

app.factory('ListsService', function($http) {
  return {

    authorize: function() {
      var apiUrl = 'https://github.com/login/oauth/authorize?client_id=2858bb8a7ee95b6c974c&scope=user%20follow';

      return apiUrl;
    },

    getLists: function(data) {
      return $http.get('https://api.github.com/search/repositories?q=' + data.keyword
      + '&page=' + data.page).then(function(response) {
        return response.data;
      });
    }

  }
});
