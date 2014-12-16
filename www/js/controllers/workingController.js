'use strict';

angular.module('deedoo').controller('workingController', function ($scope, $stateParams, $firebase, $state, config) {

    /*
     * Must be connect
     */
    if (!config.logged) {
        $state.go('connect');
        return;
    }

    /*
     * Firebase
     */
    var ref         = new Firebase(config.firebaseUrl + 'ROOM/' + $stateParams.idRoom),
        rooms       = $firebase(ref).$asArray(),
        refTasks    = new Firebase(config.firebaseUrl + 'TASKS'),
        tasks       = $firebase(refTasks).$asArray();


    $scope.working  = true;
    $scope.idRoom   = $stateParams.idRoom;
    $scope.children = [];
    $scope.room;
    $scope.tasks    = [];

    // Room Informations
    rooms.$loaded().then(function (result) {
        $scope.room = result;
    });

    // Tasks for Room
    tasks.$loaded().then(function (result) {
        for (var i = 0; i < result.length; i++) {
            if (tasks[i].id_room == $scope.idRoom) {
                $scope.tasks.push(tasks[i]);
            }
        }
    });

    /*
     * Change Status Tasks
     */
    $scope.confirmTask = function (id, status) {
        var refTask     = new Firebase(config.firebaseUrl + 'TASKS/' + id);
        var syncTask    = $firebase(refTask);
        syncTask.$update({'status': (status == 1) ? 0 : 1});
    };

});