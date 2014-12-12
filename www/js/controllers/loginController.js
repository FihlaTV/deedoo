'use strict';

angular.module('deedoo').controller('loginController', function ($scope, $state, $firebase, config) {

    var ref     = new Firebase(config.firebaseUrl+'MEMBERS'),
        members = $firebase(ref).$asArray();

    /*
     * Connect the USER
     */
    $scope.connect = function () {

        members.$loaded().then(function (result) {

            for (var i = 0; i < result.length; i++) {

                if (members[i].mail == $scope.data.email && members[i].password == $scope.data.password) {
                    config.user = members[i]; // Save User
                    // TODO Activate the redirection
                    //$state.go('');
                }

            }

        });

    };


});