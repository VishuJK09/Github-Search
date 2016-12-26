'use strict';

angular.module('app')
  .controller('AppCtrl', ['$scope', '$state', function($scope, $state) {

    $scope.app = {
      name: 'Github-Search',
      version: '1.0.0'
    }

}]);
