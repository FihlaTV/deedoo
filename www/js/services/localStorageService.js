'use strict';

angular.module('deedoo').factory('localStorage', function () {

    return {
        setTutorial: function (value) {
            window.localStorage['deedoo.tutorial'] = value;
        },
        getTutorial: function () {
            return window.localStorage['deedoo.tutorial'];
        }
    }

});