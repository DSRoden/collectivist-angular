(function(){
  'use strict';

  angular.module('collectivist')
  .controller('HomeCtrl', ['$scope', 'Home', function($scope, Home){
    $scope.forms = [];

    Home.getForms().then(function(response){
      $scope.forms = response.data.forms;
    });

    $scope.loadForm = function(id){
      console.log(id);
      $scope.hideForms = !!!$scope.hideForms;
      Home.getForm(id).then(function(response){
        $scope.form = response.data.form;
        $scope.questions = response.data.questions;
      });

      $scope.showForm = !!!$scope.showForm;
    };
  }]);
})();

