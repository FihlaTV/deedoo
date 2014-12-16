'use strict';

angular.module('deedoo').controller('boardMotherController', function ($scope, $stateParams, $firebase, $state, config) {

    /*
     * Must be connect
     */
    if(!config.logged){
        $state.go('connect');
        return;
    }

    /*
     * Firebase room & tasks
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

    // Tasks link with room
    tasks.$loaded().then(function(result){
        for (var i = 0 ; i< result.length; i++)
        {
            if(tasks[i].id_room == $scope.idRoom)
                $scope.tasks.push(tasks[i]);
        }
    });
});
