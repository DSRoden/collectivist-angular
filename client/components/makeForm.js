(function(){
  'use strict';

  angular.module('collectivist')
  .factory('MakeForm', ['$http', function($http){

    function create(question){
      return $http.post('/questions', question);
    }

    function all(){
      return $http.get('/questions');
    }

    function addForm(form){
      return $http.post('/forms', form);
    }

    function allForms(){
      return $http.get('/forms');
    }

    return {create:create, all:all, addForm:addForm, allForms:allForms};
  }]);
})();

