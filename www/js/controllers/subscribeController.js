'use strict';

angular.module('deedoo').controller('subscribeController', function ($rootScope, $scope, $state, $filter, $firebase, config) {

    var ref         = new Firebase(config.firebaseUrl + 'MEMBERS'),
        sync        = $firebase(ref),
        members     = $firebase(ref).$asArray(),
        children    = [];

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

            console.log($filter('hash')(subscribeData.password));
            return;

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

                sync.$set(result.length, {
                    "children" : children,
                    "firstname": subscribeData.firstname,
                    "lastname" : subscribeData.lastname,
                    "mail"     : subscribeData.email,
                    "password" : $filter('hash')(subscribeData.password+config.sold),
                    "phone"    : subscribeData.phone,
                    "type"     : subscribeData.type
                }).then(function(){
                    // TODO Activate the redirection
                    //$state.go('');
                });

            }

        });

    };

});