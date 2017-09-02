'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'ui.bootstrap',
    'myApp.loginApp',
    'myApp.searchApp',
    'myApp.version'
]).
    config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');

        $routeProvider.otherwise({redirectTo: '/search'});
    }])
    .run([
        '$rootScope',
        '$templateCache',
        'LocalStorageUtil',
        '$interval',
        'appConstant',
        function ($rootScope, $templateCache, LocalStorageUtil, $interval, appConstant) {

            //var users = [
            //    {userName: 'luke skywalker',
            //        password: '19BBY'},
            //    {userName: 'darth vader',
            //        password: '41.9BBY'}
            //];
            //LocalStorageUtil.setObject(appConstant.storageKeyValue.user, users);

        }]);
