'use strict';

var App = angular.module('myApp',['ui.router']);

App.controller('MainController', function($scope,$rootScope) {

    /*$rootScope.displayHeader = false;
    $rootScope.displayNav = false;
    $rootScope.displayFooter = false;*/
    showHide($rootScope,false);
  
});

function showHide($rootScope ,isValid){
    $rootScope.displayHeader = isValid;
    $rootScope.displayNav = isValid;
    $rootScope.displayFooter = isValid;
}

App.config(function($httpProvider,$stateProvider,$urlRouterProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
    $urlRouterProvider.otherwise('/login');
    
     $stateProvider
    .state('login', {
            url: '/login',
            views: {
                content: {
                      templateUrl: 'views/login.html' 
                }                         
            }
        }).state('main', {
            url: '/main',
            views: {
                header:{
                  templateUrl :'views/header.html'  
                },
                nav: {
                   templateUrl : 'views/navigation.html'
                },
                content: {
                      templateUrl: 'views/dashboard.html'                      
                },
                footer :{
                     templateUrl : 'views/footer.html'                       
                }                           
            }
        })
        .state('dashboard',{
        url : '/dashboard',
         resolve:{
          "check":function($location,$rootScope){
              if(!$rootScope.isLoggedIn){
                  $location.path('login') 
              }else{
               showHide($rootScope,true);
              }
          }  
        },
          views: {
                header:{
                  templateUrl :'views/header.html'  
                },
                nav: {
                   templateUrl : 'views/navigation.html'
                },
                content: {
                      templateUrl: 'views/dashboard.html' 
                },
                footer :{
                     templateUrl : 'views/footer.html'                       
                }                           
            }
    });
    
});




