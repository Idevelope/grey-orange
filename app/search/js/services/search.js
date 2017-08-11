(function (angular) {
    "use strict";
    angular.module("myApp").factory('searchFactory', [
        '$q',
        '$http',
        'appConstant',
        function ($q, $http, appConstant) {
            var searchFactory = {};

            //send OTP from login
            searchFactory.get = function (type, id) {
                var url = appConstant.urls[type] ;
                url += (id)?  id:'';
                return $http({
                    method: appConstant.methods.getMethod,
                    url: url
                });
            };

            searchFactory.getSomethingElse = function () {
                return $http({
                    method: appConstant.methods.putMethod,
                    url: appConstant.urls,
                    headers: {
                        //'access_token': this.tempToken,
                        //loaderNotRequired: true
                    }
                });
            };

        
            return searchFactory;

        }]);
})(angular);