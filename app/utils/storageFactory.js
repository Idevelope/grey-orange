(function (angular) {
    "use strict";

    angular.module('myApp').factory('LocalStorageUtil', [
        function () {
        /*    if (typeof(Storage) !== "undefined") {
                // Code for localStorage/sessionStorage.
            } else {
                // Sorry! No Web Storage support..
            }*/

            var factoryObj = {};


            factoryObj.createArrayFromMap = function (obj) {
                var newArr = [];
                for (var prop in obj) {
                    if (obj.hasOwnProperty(prop)) {
                        newArr.push(obj[prop]);
                    }
                }

                /*_.forOwn(arr, function (value) {
                 newArr.push(value);
                 });*/
                return newArr;
            };

            //factoryObj.putValue = function (key, mapKey, value) {
            //    var tempObj = factoryObj.getObject(key);
            //    if (tempObj) {
            //        tempObj[value[mapKey]] = value;
            //        factoryObj.saveObject(key, tempObj);
            //        return factoryObj.createArrayFromMap(tempObj);
            //    }
            //    return [];
            //};
            //
            //factoryObj.deleteValue = function (key, mapKey, value) {
            //    var tempObj = factoryObj.getObject(key);
            //    if (tempObj) {
            //        delete tempObj[value[mapKey]];
            //        factoryObj.setObject(key, tempObj);
            //        return factoryObj.createArrayFromMap(tempObj);
            //    }
            //    return [];
            //};

            factoryObj.deleteObject = function (key) {
                localStorage.removeItem(key)
            };

            factoryObj.setArray = function (key, mapKey, arr) {
                localStorage.setItem(key, JSON.stringify(factoryObj.createMapFromArray(mapKey, angular.copy(arr))));
            };

            factoryObj.setArrayWithoutMap = function (key, arr) {
                localStorage.setItem(key, JSON.stringify(arr));
            };

            factoryObj.setObject = function (key, val) {
                localStorage.setItem(key, JSON.stringify(val));
            };

            factoryObj.set = function (key, val) {
                localStorage.setItem(key, val);
            };

            factoryObj.get = function (key) {
                return localStorage.getItem(key);
            };

            factoryObj.getArray = function (key) {
                return factoryObj.createArrayFromMap(JSON.parse(localStorage.getItem(key)));
            };

            factoryObj.getArrayWithoutMap = function (key) {
                if (localStorage.getItem(key) == 'undefined')
                    return [];
                return JSON.parse(localStorage.getItem(key));
            };

            factoryObj.getObject = function (key) {
                var val = localStorage.getItem(key);
                return getObjectFromVal(val);
            };

            factoryObj.setObjectInSession = function (key, val) {
                sessionStorage.setItem(key, JSON.stringify(val))
            };

            var getObjectFromVal = function (val) {
                if (val && val !== "undefined") {
                    try {
                        return JSON.parse(val)
                    }
                    catch (err) {
                    }
                }
                return null;
            };
            factoryObj.getObjectFromSession = function (key) {
                var val = sessionStorage.getItem(key);
                return getObjectFromVal(val);
            };

            factoryObj.deleteObjectFromSession = function (key) {
                sessionStorage.removeItem(key)
            };
            return factoryObj;

        }]);
})(angular);