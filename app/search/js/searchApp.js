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
        '$location',
        function ($scope, appConstant, LocalStorageUtil, searchFactory, $timeout, $http, $location) {
            //var timer;
            // will fetch user info of user selected from dropdown.
            $scope.getUserRepo = function (item, model, label) {
                if(!$scope.selectedUser.login){
                    return;
                }
                  console.dir(item);
                  console.dir(model);
                  console.dir(label);
                //LocalStorageUtil.setObject(appConstant.storageKeyValue.user, $scope.selectedUser);
                updateQueryParams('user', $scope.selectedUser.login);
                getUserRepositories($scope.selectedUser.login);
            };

            //this is for typeahead- as our typeahead handles promise well .
            $scope.getUserList = function (text) {
                var url = appConstant.urls['gitUserList'];
                if (text) {
                    return $http.get(url, {
                        params: {q: text}
                    }).then(function (response) {
                        return response.data.items.map(function (item) {
                            return item;
                        });
                    },handlerError);
                }

            };
            function getUserRepositories(userId) {
                searchFactory.get('gitUser', userId).then(function (response) {
                    if (200 == response.status) {
                        //:TODO : data model layer to implement to maintain consistency
                        $scope.userRepos = response.data.items;
                    }
                }, handlerError)
            }

            function updateQueryParams(key, val) {
                $location.search(key, val);
            }

            //:TODO: need to make it util function for global use according to status code
            var handlerError =function (error) {
                console.error(error);
                alert('error occurred');
            };


            // to initialise the my controller and pre-checks;
            function init() {
                //:TODO implement if pagination is required; but api is not supporting or not mentioned in problem statement
                $scope.selectedPage = 1;
                $scope.totalCount = 0;
                $scope.totalPage = 1;
                $scope.selectedUser = '';

                /***another workaround is using localstorage to maintain the state of user* ***/
                //$scope.selectedUser = (LocalStorageUtil.getObject(appConstant.storageKeyValue.user))? LocalStorageUtil.getObject(appConstant.storageKeyValue.user) : '';

                if (!(_.isEmpty($location.search())) &&  $location.search().user) {
                    var userId = $location.search().user;
                    $scope.selectedUser =  userId;
                    getUserRepositories(userId)
                }
                $scope.$watch('selectedUser', function (newVal, oldVal) { console.log('watcher', newVal, oldVal);
                    if(''=== newVal || !newVal){
                        $scope.userRepos.length=0;
                    }
                });
            }

            init();

        }]);