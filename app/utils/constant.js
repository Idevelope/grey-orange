(function (angular) {
    "use strict";
    angular.module('myApp').constant('appConstant', {
        storageKeyValue: {
         user: 'USERS'
        },
        methods: {
            'getMethod': 'GET',
            'postMethod': 'POST',
            'putMethod': 'PUT',
            'patchMethod': 'PATCH',
            'deleteMethod': 'DELETE'
        },
        urls:{
            "gitUserList": "https://api.github.com/search/users",
            "gitUser": "https://api.github.com/search/repositories"
        }
    })
})(angular);
/**
 * Created by s.priy on 8/10/2017.
 */
