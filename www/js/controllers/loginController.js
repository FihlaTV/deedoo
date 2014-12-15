'use strict';

angular.module('deedoo').controller('loginController', function ($scope, $state, $filter, $firebase, config, localStorage) {

    /*
     * Get Informations from Firebase
     */
    var ref     = new Firebase(config.firebaseUrl+'MEMBERS'),
        members = $firebase(ref).$asArray();

    /*
     * Connect the USER
     */
    $scope.connect = function () {

        members.$loaded().then(function (result) {

            for (var i = 0; i < result.length; i++) {

                if (members[i].mail == $scope.data.email && members[i].password == $filter('hash')($scope.data.password+config.sold)) {
                    config.user = members[i];
                    config.logged = true;
                    $state.go((members[i].type == 'parent') ? 'newTask': 'tab.guards');
                }

            }

        });

    };


});