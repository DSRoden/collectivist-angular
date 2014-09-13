(function(){
  'use strict';

  angular.module('collectivist')
  .factory('Home', ['$http', function($http){

    function getForms(){
      return $http.get('/home');
    }

    function submit(responses, formID){
      $http.put('/answer', {responses:responses, formID:formID}).then(function(){
        return $http.get('/results/:formId');
      });
    }

    function getForm(id){
      return $http.post('/form', {id:id});
    }
    return {submit:submit, getForms:getForms, getForm:getForm};
  }]);
})();

