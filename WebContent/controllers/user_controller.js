'use strict';

angular.module('myApp').controller('UserController', ['$location','$rootScope','$scope', 'UserService', function($location,$rootScope,$scope, UserService) {
    var self = this;
    self.user={id:null,username:'',address:'',email:''};
    self.users=[];
    $scope.userPostName = '';
    var username = $scope.username;
    var pwd = $scope.userpwd;
        
    $scope.submit = function(){
        var username = $scope.username;
        var pwd = $scope.userpwd;
        var isSuccess = false;
        var urlBase = 'http://localhost:8080/employee';
        var userObj = {"username":username,"userpwd":pwd};
        authenticateUser($scope,username,pwd,$rootScope,$location);
    };
    
    function authenticateUser($scope,username,pwd,$rootScope,$location){
        var user = {"username":username,"password":pwd}
        UserService.authenticateUser(user).then(
            function(responseText) {
                if(responseText.isValidUser == 'true'){
                    $rootScope.isLoggedIn = true;
                    getUserDetails(user,$location);
                }else{
                    alert('Invalid Credentials');
                }
            },
            function(errResponse){
                console.error('Error while fetching Users');
            }
        );
        
    
    }
    
    function getUserDetails(userObj,$location){
        var userObj = {"username":userObj.username};
        UserService.getUserDetails(userObj).then(
        function(responseText){
            $rootScope.userPostName = responseText.name + " Last Login Date and Time :"+responseText.lastLogin;
            console.log('User Details Received::>'+responseText.name+"::"+responseText.lastLogin);
            $location.path('dashboard');
        },function(errorResponse){
           console.log('Not able to get the details'); 
        });
    }
    
    self.submit = submit;
    self.edit = edit;
    self.remove = remove;
    self.reset = reset;


     // fetchAllUsers();

    function fetchAllUsers(){
        UserService.fetchAllUsers()
            .then(
            function(d) {
                self.users = d;
            },
            function(errResponse){
                console.error('Error while fetching Users');
            }
        );
    }

    function createUser(user){
        UserService.createUser(user)
            .then(
            fetchAllUsers,
            function(errResponse){
                console.error('Error while creating User');
            }
        );
    }

    function updateUser(user, id){
        UserService.updateUser(user, id)
            .then(
            fetchAllUsers,
            function(errResponse){
                console.error('Error while updating User');
            }
        );
    }

    function deleteUser(id){
        UserService.deleteUser(id)
            .then(
            fetchAllUsers,
            function(errResponse){
                console.error('Error while deleting User');
            }
        );
    }

    function submit() {/*
        if(self.user.id===null){
            console.log('Saving New User', self.user);
            createUser(self.user);
        }else{
            updateUser(self.user, self.user.id);
            console.log('User updated with id ', self.user.id);
        }
        reset();*/
        
        alert('controller coming here ');
    }

    function edit(id){
        console.log('id to be edited', id);
        for(var i = 0; i < self.users.length; i++){
            if(self.users[i].id === id) {
                self.user = angular.copy(self.users[i]);
                break;
            }
        }
    }

    function remove(id){
        console.log('id to be deleted', id);
        if(self.user.id === id) {//clean form if the user to be deleted is shown there.
            reset();
        }
        deleteUser(id);
    }


    function reset(){
        self.user={id:null,username:'',address:'',email:''};
        $scope.myForm.$setPristine(); //reset Form
    }

}]);
