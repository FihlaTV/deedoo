'use strict';

angular.module('deedoo').controller('informationGuardController', function ($rootScope, $scope, $state, $stateParams, $firebase, config) {

    /*
     * Must be connect
     */
    if (!config.logged) {
        $state.go('connect');
        return;
    }

    $scope.confirm = function (booleen) {
        if (booleen) {

            var refRoom     = new Firebase(config.firebaseUrl + 'ROOM/' + $stateParams.idGuard);
            var syncRoom    = $firebase(refRoom);

            syncRoom.$update({'status': true}).then(function () {
                $state.go('tab.guards');
            });

        }
        else {
            console.log('Decliner');
        }
    };

});