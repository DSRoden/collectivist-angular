(function(){
  'use strict';

  angular.module('collectivist')
  .factory('Home', ['$http', function($http){

    function getForms(){
      return $http.get('/home');
    }

    function getForm(id){
      return $http.post('/form', {id:id});
    }

    function submit(responses, formID){
      return $http.post('/results', {responses:responses, formID:formID});
    }

    return {getForms:getForms, getForm:getForm, submit:submit};
  }]);
})();

