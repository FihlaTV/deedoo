'use strict';

angular.module('deedoo').controller('guardsController', function ($rootScope, $scope, $state, $firebase, config) {

    /*
     * Firebase
     */
    var ref     = new Firebase(config.firebaseUrl + 'ROOM'),
        rooms   = $firebase(ref).$asArray();

    $rootScope.guards = [];
    $scope.babysitter = config.user;

    rooms.$loaded().then(function (result) {
        for (var i = 0; i < result.length; i++) {

            if (rooms[i].id_babysitter == $scope.babysitter.$id) {

                $rootScope.guards.push({
                    'id_room'         : rooms[i].$id,
                    'id_parent'       : rooms[i].id_parent,
                    'status'          : rooms[i].status,
                    'time_beginning'  : rooms[i].time_beginning,
                    'time_ending'     : rooms[i].time_ending,
                    'children'        : rooms[i].children,
                    'parent_lastname' : rooms[i].lastname_parent,
                    'parent_firstname': rooms[i].firstname_parent
                });

            }

        }
    });

    $scope.confirmGuard = function (idRoom) {
        var refRoom     = new Firebase(config.firebaseUrl + 'ROOM/' + idRoom);
        var syncRoom    = $firebase(refRoom);
        syncRoom.$update({'status': true}).then(function(){
            $state.go('tab.working', {idRoom: idRoom});
        });
    };

});