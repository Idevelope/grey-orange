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
            "films": "https://swapi.co/api/films/",
            "people": "https://swapi.co/api/people/",
            "planets": "https://swapi.co/api/planets/",
            "species": "https://swapi.co/api/species/",
            "starShips": "https://swapi.co/api/starships/",
            "vehicles": "https://swapi.co/api/vehicles/"
        }
    })
})(angular);
/**
 * Created by s.priy on 8/10/2017.
 */
