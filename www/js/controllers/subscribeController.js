'use strict';

angular.module('deedoo').controller('subscribeController', function ($rootScope, $scope, $firebase, config) {

    var ref     = new Firebase('https://radiant-inferno-550.firebaseio.com/MEMBERS'),
        sync    = $firebase(ref),
        members = $firebase(ref).$asArray(),
        good    = true;

    $rootScope.subscribeData = {};

    $scope.subscribe = function () {

        var subscribeData = $rootScope.subscribeData;

        members.$loaded().then(function (result) {

            // User with the same Mail OR phone can't subscribe
            for (var i = 0; i < result.length; i++) {
                if (members[i].mail == subscribeData.email) {
                    good += '[INVALID] : Same EMail';
                }
                else if (members[i].phone == subscribeData.phone) {
                    good += '[INVALID] : Same Phone'
                }
            }

            // If Good Subscribe
            if (good) {
                sync.$set(result.length, {
                    "children" : ["Emilie", "Mathieu"],
                    "firstname": subscribeData.firstname,
                    "lastname" : subscribeData.lastname,
                    "mail"     : subscribeData.email,
                    "password" : subscribeData.password,
                    "phone"    : subscribeData.phone,
                    "type"     : subscribeData.type
                });
            }


        });

    };

});