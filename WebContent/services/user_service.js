'use strict';

angular.module('myApp').factory('UserService', ['$http','$q', function($http, $q){
    var BASE_URL = 'http://localhost:8080/AngularJSServices/';
    var REST_SERVICE_URI = BASE_URL+'user/';

    var factory = {
        fetchAllUsers: fetchAllUsers,
        createUser: createUser,
        updateUser:updateUser,
        deleteUser:deleteUser,
        authenticateUser:authenticateUser,
        getUserDetails :getUserDetails,
        listAllUsers : listAllUsers
    };

    return factory;
    
    function listAllUsers(){
        var deferred = $q.defer();
        $http.get(BASE_URL+"listAllUsers/").then(
        function(response){
            deferred.resolve(response.data);
        },function(errResponse){
           deferred.resolve(errResponse); 
        });
        return deferred.promise;
    }
    function authenticateUser(user){
        var deferred = $q.defer();
        $http.post(BASE_URL+'authenticateUser/',user)
        .then(function(response){
            deferred.resolve(response.data)
        },function(errResponse){
            console.log('Error While Authenticating User');
            deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }

    function getUserDetails(user){
        var deferred = $q.defer();
        $http.post(BASE_URL+"getUserDetails/",user).then(
        function(response){
            deferred.resolve(response.data);
        },function(errResponse){
           deferred.resolve(errResponse); 
        });
        return deferred.promise;
    }
    
    function fetchAllUsers() {
        var deferred = $q.defer();
        $http.get(REST_SERVICE_URI)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while fetching Users');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }

    function createUser(user) {
        var deferred = $q.defer();
        $http.post(REST_SERVICE_URI, user)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while creating User');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }


    function updateUser(user, id) {
        var deferred = $q.defer();
        $http.put(REST_SERVICE_URI+id, user)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while updating User');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }

    function deleteUser(id) {
        var deferred = $q.defer();
        $http.delete(REST_SERVICE_URI+id)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while deleting User');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }

}]);
