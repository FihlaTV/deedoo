'use strict';

angular.module('deedoo').controller('subscribeController', function ($rootScope, $scope, $firebase, config) {

    var ref         = new Firebase(config.firebaseUrl + 'MEMBERS'),
        sync        = $firebase(ref),
        members     = $firebase(ref).$asArray(),
        good        = true,
        children    = [];

    $rootScope.subscribeData = {};

    /*
     * Subscribe the USER
     */
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

                // TODO Change this
                if (angular.isDefined(subscribeData.children)) {
                    if (angular.isDefined(subscribeData.children.one)) {
                        children.push(subscribeData.children.one);
                    }
                    if (angular.isDefined(subscribeData.children.two)) {
                        children.push(subscribeData.children.two);
                    }
                    if (angular.isDefined(subscribeData.children.three)) {
                        children.push(subscribeData.children.three);
                    }
                    if (angular.isDefined(subscribeData.children.four)) {
                        children.push(subscribeData.children.four);
                    }
                }

                sync.$set(result.length, {
                    "children" : children,
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