'use strict';


/*
 *  Controller of informations_guard.html 
 *  --> Page for: BABYSITTER | display informations about 1 new guard
*/ 


angular.module('deedoo').controller('informationGuardController', function ($rootScope, $scope, $state, $stateParams, $firebase, config) {

    /*
     * Must be connect
     */
    if (!config.logged) {
        $state.go('connect');
        return;
    }

    /*
     * Firebase room & tasks
     */
    var refGuard    = new Firebase(config.firebaseUrl + 'ROOM/' + $stateParams.idGuard),
        room        = $firebase(refGuard).$asObject();

    /*
     * Informations guard
     */
    room.$loaded().then(function (result) {
        var childrens       = '',
            first           = true;


        result.children.forEach(function(element, key, array)
        {
            if(first)
            {
                childrens += element.name;
                first = false;
            }
            else
                childrens += ', ' + element.name;
        });

        $scope.data = 
        {
            'firstname_parent'    : result.firstname_parent,
            'lastname_parent'     : result.lastname_parent,
            'time_beginning'      : result.time_beginning,
            'time_ending'         : result.time_ending,
            'date'                : result.date,
            'childrens'           : childrens
        };

        console.log($scope.data);

    });

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