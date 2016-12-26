'user strict';

var app = angular.module('app');
/* Lists Service */

app.factory('ListsService', function($http) {
  return {

    getLists: function(keyword) {
      return $http.get('https://api.github.com/search/repositories?q=' + keyword + '+in:name&sort=stars&order=desc').then(function(response) {
        return response.data;
      });
    }

  }
});
