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
        '$http',
        function ($scope, appConstant, LocalStorageUtil, searchFactory, $timeout, $http) {
            var timer;
            $scope.search = function (text) {
                if(text && 1 <text.length){
                    $timeout.cancel(timer);
                    timer = $timeout(
                        function () {
                            searchFactory.get('states' ,text).then(function(response){
                                if(200 == response.status){
                                    console.dir(response);
                                    $scope.searchList = response.data.results;
                                   return $scope.address = response.data.results;
                                }
                            }, function(error){
                                console.dir(error);
                                alert('some error occured');
                            })
                        }, 500);
                }

            };

            $scope.getLocation = function(text){
                var url = appConstant.urls['states'] ;
                if(text){
                    return $http.get(url, {
                        params:{query: text}
                    }).then(function (response) {
                            return response.data.places.map(function (item) {
                                return item;
                            });
                        }, function(error){
                            console.dir(error);
                            alert('some error occured');
                        });
                }

            };

            $scope.getCities = function(){
                console.log($scope.selectedState);
                $scope.cityList = [];
                getCities($scope.selectedState.id, 1);
            };


            //:TODO: need make it util function for global use according to status code
            function handlerError(error){
                alert('error occurred');
            }

            function getCities(id, pageNo){
                searchFactory.getCities('cities',{stateId:id, pageNo:pageNo}).then(function(response){
                    $scope.cityList = response.data.places;
                    $scope.totalCount =response.data.totalCount;
                    $scope.totalPage = response.data.totalPages;
                    $scope.pageList = _.range(1,$scope.totalPage+1);
                }, handlerError)
            }
            $scope.getPageResult = function (pageNo){
                $scope.selectedPage = Number(pageNo);
                getCities($scope.selectedState.id, $scope.selectedPage);
//                searchFactory.getCities('cities',{stateId:$scope.selectedState.id, pageNo:$scope.selectedPage}).then(function(response){
//                    $scope.cityList.concat(response.data.places);
//                }, handlerError)
            }

            function init(){
                $scope.selectedPage = 1;
                $scope.totalCount =0;
                $scope.totalPage = 1;
//                searchFactory.get('people').then(function(response){
//                    console.dir(response);
//                    if(200 == response.status){
//                        //:TODO : data model layer to implement to maintain consistency
//                        $scope.searchList = response.data.results;
//                    }else{
//                        handlerError();
//                    }
//                }, function(error){
//                    console.dir(error);
//                    alert('some error occured');
//                })
            }

            init();

        }]);