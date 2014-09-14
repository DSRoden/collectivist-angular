(function(){
  'use strict';

  angular.module('collectivist')
  .controller('MakeFormCtrl', ['$scope', 'MakeForm', function($scope, MakeForm){
    $scope.question = {};
    $scope.questions = [];
    $scope.form = {};

    MakeForm.all().then(function(response){
      $scope.questions = response.data.questions;
    });

    MakeForm.allForms().then(function(response){
      $scope.forms = response.data.forms;
    });

    $scope.addQuestion = function(){
      $scope.question.formId = $scope.formId;
      MakeForm.create($scope.question).then(function(response){
        $scope.questions.push($scope.question);
        $scope.question = {};
      });
    };

    $scope.addForm = function(){
      $scope.form.questions = [];
      MakeForm.addForm($scope.form).then(function(response){
        $scope.formId = response.data.form._id;
        $scope.form = {};
      });
    };

  }]);
})();

