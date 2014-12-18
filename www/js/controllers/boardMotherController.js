'use strict';

angular.module('deedoo').controller('boardMotherController', function ($scope, $stateParams, $firebase, $state, config, notification, $ionicPopup) {

    /*
     * Must be connect
     */
    if (!config.logged) {
        $state.go('connect');
        return;
    }
    else {
        $scope.idRoom       = $stateParams.idRoom;
        $scope.babysitter   = {};
        $scope.children     = [];
        $scope.tasks        = [];
        $scope.timeEnding;
        $scope.room;
    }

    /*
     * Firebase room & tasks
     */
    var ref         = new Firebase(config.firebaseUrl + 'ROOM/' + $stateParams.idRoom),
        rooms       = $firebase(ref).$asArray(),
        roomsObject = $firebase(ref).$asObject(),
        refTasks    = new Firebase(config.firebaseUrl + 'TASKS'),
        tasks       = $firebase(refTasks).$asArray();

    /*
     * Informations Children
     */
    roomsObject.$loaded().then(function (result) {
        $scope.children     = result.children;
        $scope.timeEnding   = result.time_ending;

        var refBabysitter   = new Firebase(config.firebaseUrl + 'MEMBERS/' + result.id_babysitter);
        var syncBabysitter  = $firebase(refBabysitter).$asObject();

        syncBabysitter.$loaded().then(function (result) {
            $scope.babysitter.firstname = result.firstname;
            $scope.babysitter.lastname  = result.lastname;
        });

    });

    /*
     * Informations Room
     */
    rooms.$loaded().then(function (result) {
        $scope.room = result;
    });

    /*
     * Listen Children sleeping
     */
    ref.orderByChild('sleeping').on('child_changed', function (result) {
        $scope.children = result.val();
        notification.add('Un de vos enfant dort paisiblement');
    });

    /*
     * Notification for Tasks
     */
    refTasks.orderByChild('status').on('child_changed', function (result) {
        if(result.val().id_room == $scope.idRoom && result.val().status==1){
            notification.add('Une recommandation a été effectuée');
        }
    });

    // Tasks link with room
    tasks.$loaded().then(function (result) {
        for (var i = 0; i < result.length; i++) {
            if (tasks[i].id_room == $scope.idRoom){
                $scope.tasks.push(tasks[i]);
            }
        }
    });

    /*
     * End Guard (Status -> done)
     */
    $scope.endGuard = function () {

        var confirmPopup = $ionicPopup.confirm({
            title: 'Deedoo',
            template: 'Souhaitez-vous terminer la garde maintenant ?',
            okText: 'Oui',
            cancelText: 'Non'
        });
        confirmPopup.then(function(res) {
            if(res) {
                $firebase(ref).$update({'status': 'done'}).then(function () {
                    $state.go('newTask');
                });
            }
        });

    };

});