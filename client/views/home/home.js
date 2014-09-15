(function(){
  'use strict';

  angular.module('collectivist')
  .controller('HomeCtrl', ['$scope', 'Home', function($scope, Home){
    $scope.forms = [];
    $scope.questions = [];
    $scope.question = null;
    $scope.responses = [];
    $scope.response = {};
    $scope.qIndex = 0;

    Home.getForms().then(function(response){
      $scope.showForm = false;
      $scope.forms = response.data.forms;
    });

    $scope.loadForm = function(id){
      console.log(id);
      $scope.hideForms = !!!$scope.hideForms;
      Home.getForm(id).then(function(response){
        $scope.form = response.data.form;
        $scope.questions = response.data.questions;
        $scope.question = $scope.questions[$scope.qIndex];
        $scope.response = {qId:$scope.question._id};
      });

      $scope.showForm = true;
    };


    $scope.addResponse = function(){
      $scope.responses.push($scope.response);
      $scope.qIndex += 1;
      if($scope.qIndex === $scope.questions.length){
        $scope.showForm = false;
        $scope.formCompleted = true;
        //call submit form function
      }else{
        $scope.question = $scope.questions[$scope.qIndex];
        $scope.response = {qId:$scope.question._id};
      }

    };

    $scope.submitResponses = function(){
      Home.submit($scope.responses, $scope.form._id).then(function(response){
        $scope.formCompleted = false;
        $scope.results = response.data.results[0];
        $scope.avg     = response.data.results[1];
        $scope.syncScore = true;
      });
    };


  }]);
})();

