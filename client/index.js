(function(){
  'use strict';

  angular.module('collectivist', ['ngRoute'])
  .config(['$routeProvider', function($routeProvider){
    $routeProvider
    .when('/', {templateUrl:'/views/home/home.html', controller:'HomeCtrl'})
    .when('/makeForm', {templateUrl:'/views/makeForm/makeForm.html', controller:'MakeFormCtrl'})
    .otherwise({redirectTo:'/'});
  }]);
})();

