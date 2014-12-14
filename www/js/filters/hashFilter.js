'use strict';

angular.module('deedoo').filter('hash', function () {
    return function (string) {
        return sha256_digest(string);
    }
});