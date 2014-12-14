'use strict';

angular.module('deedoo').controller('subscribeController', function ($rootScope, $scope, $state, $filter, $firebase, config) {

    /*
     * Get Informations from Firebase
     */
    var ref = new Firebase(config.firebaseUrl + 'MEMBERS'),
        sync = $firebase(ref),
        members = $firebase(ref).$asArray(),
        children = [];

    $rootScope.subscribeData = {};
    $rootScope.subscribeGood = true;

    /*
     * Subscribe the USER
     */
    $scope.subscribe = function () {

        var subscribeData = $rootScope.subscribeData;

        members.$loaded().then(function (result) {

            // User with the same Mail OR phone can't subscribe
            for (var i = 0; i < result.length; i++) {
                if (members[i].mail == subscribeData.email) {
                    $rootScope.subscribeGood = '[INVALID] : Same EMail';
                }
                else if (members[i].phone == subscribeData.phone) {
                    $rootScope.subscribeGood = '[INVALID] : Same Phone'
                }
            }

            // If Good Subscribe
            if ($rootScope.subscribeGood) {

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

                var user = {
                    "children" : children,
                    "firstname": subscribeData.firstname,
                    "lastname" : subscribeData.lastname,
                    "mail"     : subscribeData.email,
                    "password" : $filter('hash')(subscribeData.password + config.sold),
                    "phone"    : subscribeData.phone,
                    "type"     : subscribeData.type
                };

                sync.$set(result.length, user).then(function () {
                    if (subscribeData.type == 'parent') {
                        config.user = user;
                        $state.go('newTask');
                    }
                    else {
                        // TODO Activate the redirection
                        //$state.go('');
                    }
                });

            }

        });

    };

    /*
     * Remove Keyboard when change Slide
     */
    $scope.hideKeyboard = function () {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.close();
        }
    };

});