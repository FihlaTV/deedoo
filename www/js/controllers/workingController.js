'use strict';

/*
 *  Controller of tab-working.html
 *  --> Page for: BABYSITTER | List of task of current babysitting
 */
angular.module('deedoo').controller('workingController', function ($scope, $rootScope, $stateParams, $firebase, $state, config) {

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
        roomsObject = $firebase(ref).$asObject(),
        refTasks    = new Firebase(config.firebaseUrl + 'TASKS'),
        tasks       = $firebase(refTasks).$asArray();


    $scope.working              = true;
    $scope.idRoom               = $stateParams.idRoom;
    $rootScope.childrenSleeping = [];
    $scope.room;
    $scope.tasks                = [];

    // Room Informations
    rooms.$loaded().then(function (result) {
        $scope.room = result;
    });

    // Children
    roomsObject.$loaded().then(function (result) {
        for(var i in result.children){
            $rootScope.childrenSleeping.push({
                'name'      : result.children[i].name,
                'sleeping'  : result.children[i].sleeping
            });
        }
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

    /*
     * Change Status sleeping
     */
    $scope.changeSleeping = function (name, index) {
        console.log('changeSleeping');
        var refRoom = new Firebase(config.firebaseUrl + 'ROOM/'+$stateParams.idRoom+'/children/'+index);
        var syncRoom = $firebase(refRoom);
        if($rootScope.childrenSleeping[index].sleeping){
            console.log('false');
            syncRoom.$update({'sleeping': false});
            $rootScope.childrenSleeping[index].sleeping = false;
        }
        else{
            console.log('true');
            syncRoom.$update({'sleeping': true});
            $rootScope.childrenSleeping[index].sleeping = true;
        }

    };

});