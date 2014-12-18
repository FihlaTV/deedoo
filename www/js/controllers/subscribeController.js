'use strict';

angular.module('deedoo').controller('subscribeController', function ($rootScope, $scope, $state, $filter, $firebase, $ionicSlideBoxDelegate, config, camera) {

    /*
     * Get Informations from Firebase
     */
    var ref         = new Firebase(config.firebaseUrl + 'MEMBERS'),
        sync        = $firebase(ref),
        members     = $firebase(ref).$asArray(),
        children    = [];

    $rootScope.subscribeData = {};
    $rootScope.subscribeGood = true;

    /*
     * Automatic change Slide when we change Type
     */
    $scope.$watch('subscribeData.type', function () {
        $ionicSlideBoxDelegate.next();
    });

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
                    children = [];
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
                    "mail"     : $filter('lowercase')(subscribeData.email),
                    "password" : $filter('hash')(subscribeData.password + config.sold),
                    "phone"    : subscribeData.phone,
                    "type"     : subscribeData.type,
                    "picture"  : (subscribeData.picture != null) ? subscribeData.picture : ""
                };

                sync.$set(result.length, user).then(function () {
                    if (subscribeData.type == 'parent') {
                        config.user = user;
                        $state.go('newTask');
                    }
                    else {
                        $state.go('tab.guards');
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

    /*
     * Get picture on the mobile
     */
    $scope.getPicture = function () {
        camera.getPicture().then(function (imageURI) {
            $rootScope.subscribeData.picture = imageURI;
        }, function (err) {
            console.err(err);
        }, {
            quality         : 100,
            targetWidth     : 200,
            targetHeight    : 200,
            saveToPhotoAlbum: false
        });
    };

});
