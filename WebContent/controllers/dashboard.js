/*
'use strict';
var showApp = angular.module('myApp', []);

showApp.controller('DashController', function($scope,$rootScope) {

  $scope.userPostName = $rootScope.userPostName;
  
});
*/

'use strict';

/*angular.module('myApp').controller('DashController', ['$location','$rootScope','$scope', 'UserService', function($location,$rootScope,$scope, UserService) {
    
    $scope.list = listAllUsers
      $scope.config = {
        itemsPerPage: 5,
        fillLastPage: true
      }
    
      function  listAllUsers(){
        var userObj = {"username":userObj.username};
        UserService.listAllUsers().then(
        function(responseText){
            return responseText;
        },function(errorResponse){
           console.log('Not able to get the details'); 
        });
      }     

}]);*/


angular.module('myApp').controller('DashController',['$location','$rootScope','$scope', 'UserService', 
                                                     function($location,$rootScope,$scope, UserService) {
 /* var userObj = [{"mobileNo":"7338702133","firstName":"Manikanta","secondName":"Bommisetty","designation":"CMN"},
                  {"mobileNo":"7799413707","firstName":"BABU","secondName":"Bommisetty","designation":"POWER"},
                  {"mobileNo":"9553254899","firstName":"MANI","secondName":"Bommisetty","designation":"Star"}]*/
    
  /*  var userObj = [];*/
   $scope.userList = listAllUsers();
   /* $scope.users = userObj;*/
  function listAllUsers(){
        console.log('calling list users');
        UserService.listAllUsers().then(
        function(responseText){
            $scope.users = responseText;
          // return responseText;
        },function(errorResponse){
           console.log('Not able to get the details'); 
        });
      }
  //  $scope.$watch($scope.users,listAllUsers);
}]);
