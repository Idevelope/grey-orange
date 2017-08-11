'use strict';

angular.module('myApp.searchApp', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/search', {
            templateUrl: 'search/search.html',
            controller: 'searchCtrl'
        });
    }])

    .controller('searchCtrl', [
        '$scope',
        'appConstant',
        'LocalStorageUtil',
        'searchFactory',
        '$timeout',
        function ($scope, appConstant, LocalStorageUtil, searchFactory, $timeout) {
            var timer;
            $scope.search = function (text) {
                if(text && 1 <text.length){
                    $timeout.cancel(timer);
                    timer = $timeout(
                        function () {
                            searchFactory.get('people', text).then(function(response){
                                if(200 == response.status){
                                    console.dir(response);
                                    $scope.searchList = response.data.results;
                                }
                            }, function(error){
                                console.dir(error);
                                alert('some error occured');
                            })
                        }, 500);
                }

            };

            //:TODO: need make it util function for global use according to status code
            function handlerError(){
                alert('error occurred');
            }

            function init(){
                searchFactory.get('people').then(function(response){
                    console.dir(response);
                    if(200 == response.status){
                        //:TODO : data model layer to implement to maintain consistency
                        $scope.searchList = response.data.results;
                    }else{
                        handlerError();
                    }
                }, function(error){
                    console.dir(error);
                    alert('some error occured');
                })
            }

            init();

        }]);