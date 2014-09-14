(function(){
  'use strict';

  angular.module('collectivist')
  .controller('FormCtrl', ['$scope', 'Form', function($scope, Form){

    Form.getMessage().then(function(response){
      $scope.mean = response.data.mean;
    });

  }]);
})();

