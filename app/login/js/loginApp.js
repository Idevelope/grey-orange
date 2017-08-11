'use strict';

angular.module('myApp.loginApp', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'login/login.html',
    controller: 'loginCtrl'
  });
}])

.controller('loginCtrl', [
        '$scope',
        'LocalStorageUtil',
        'appConstant',
        '$location',
        function($scope, LocalStorageUtil, appConstant, $location) {
      //$scope.cry = function () {
      //  alert('plzz login');
      //}
      //
      //  $scope.cry();
        function init(){
            $scope.user = {
                userName:'Luke Skywalker',
                password:'19BBY'
            };
        }

        $scope.tryLogin = function () {
            console.dir($scope.user);
            if($scope.user.userName && $scope.user.password){
               var validUsers = LocalStorageUtil.getObject(appConstant.storageKeyValue.user);
                if(validateUser(validUsers)){
                    $location.path('search')
                }

            }else{
                alert('Please enter username and password!!');
            }
        };

            function validateUser(users){
                var tempUser = _.find(users, function(user){
                    return user.userName == $scope.user.userName.toLowerCase();
                });
                return tempUser &&  (tempUser.password ==  $scope.user.password)
            }

        init();

}]);