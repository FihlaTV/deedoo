'use strict';

angular.module('deedoo').controller('newTaskController', function ($rootScope, $scope, $state, $firebase, config) {

    /*
     * If user is no connected -> Redirect to connect
     */
    //if(!config.user.logged){
    //    $state.go('connect');
    //    return;
    //}

    /*
     * Get Informations from Firebase
     */
    var ref         = new Firebase(config.firebaseUrl + 'MEMBERS'),
        refRoom     = new Firebase(config.firebaseUrl + 'ROOM'),
        refTask     = new Firebase(config.firebaseUrl + 'TASKS'),
        syncRoom    = $firebase(refRoom),
        syncTask    = $firebase(refTask),
        sync        = $firebase(ref),
        tasks       = $firebase(refTask).$asArray(),
        members     = $firebase(ref).$asArray(),
        rooms       = $firebase(refRoom).$asArray(),
        roomId;

    /*
     * User Informations
     */
    $scope.parent   = config.user;
    $scope.good     = false;

    if (!$rootScope.firstPassage) {
        $rootScope.babysitters = [];
        $rootScope.children = {};
        $rootScope.newTaskForm = {};
        $rootScope.notifications = [
            {
                "added"    : false,
                "title"    : "A fait prout",
                "children" : null,
                'timeStart': "",
                'timeEnd'  : ""
            },
            {
                "added"    : false,
                "title"    : "A fait pipi",
                "children" : null,
                'timeStart': "",
                'timeEnd'  : ""
            },
            {
                "added"    : false,
                "title"    : "A fait caca",
                "children" : null,
                'timeStart': "",
                'timeEnd'  : ""
            }
        ];
        for (var i in config.user.children) {
            $rootScope.children[i] = {
                'name'  : config.user.children[i],
                'status': false
            };
        }
        /*
         * Load all babysitters
         */
        members.$loaded().then(function (result) {
            for (var i = 0; i < result.length; i++) {
                if (members[i].type == 'babysitter') {
                    $rootScope.babysitters.push(members[i]);
                }
            }
        });
    }

    /*
     * When new notification -> count change
     */
    $rootScope.$watch('notifications', function () {
        $rootScope.notificationsCount = 0;
        for (var i in $rootScope.notifications) {
            if ($rootScope.notifications[i].added) {
                $rootScope.notificationsCount++;
            }
        }
    });

    /*
     * When user select new Child
     */
    $scope.childrenChange = function () {
        console.log($rootScope.children);
    };

    /*
     * Create New Task and seed Notification to the babysitter
     */
    $scope.createTask = function () {

        /*
         * Verifications
         */
        if ($rootScope.notificationsCount == 0) { // Must have One notification
            console.log('Must have one or more notification');
        }

        else {

            var room = {
                'id_babysitter' : $rootScope.newTaskForm.babysitterId,
                'id_parent'     : config.user.$id,
                'status'        : false,
                'time_beginning': $rootScope.newTaskForm.date+'-'+$rootScope.newTaskForm.timeStart,
                'time_ending'   : $rootScope.newTaskForm.date+'-'+$rootScope.newTaskForm.timeEnd,
                'children'      : []
            };

            // Add children
            for(var i in $rootScope.children){
                if($rootScope.newTaskForm.children[i]){
                    room.children[i] = {
                        'name': $rootScope.children[i].name,
                        'sleeping': false
                    }
                }
            }

            // Add to firebase
            rooms.$loaded().then(function (result) {
                roomId = result.length;
                syncRoom.$set(roomId, room);
            }).then(function(){

                // Add one per one notifications in firebase
                for(var i in $rootScope.notifications){
                    if($rootScope.notifications[i].added){

                        var task = {
                            'id_room'       : roomId,
                            'message'       : $rootScope.notifications[i].title,
                            'status'        : 0,
                            'time_beginning': ($rootScope.notifications[i].timeStart != "") ? $rootScope.notifications[i].timeStart : null,
                            'time_ending'   : ($rootScope.notifications[i].timeEnd != "") ? $rootScope.notifications[i].timeEnd : null
                        };

                        if($rootScope.notifications[i].children == null){
                           task['children'] = null;
                        }
                        else{
                            task['children'] = [];
                            for(var j in $rootScope.notifications[i].children){
                                task['children'].push($rootScope.notifications[i].children[j]);
                            }
                        }
                        // Other
                        if($rootScope.notifications[i].other != null) {
                            task['other'].push($rootScope.notifications[i].other);
                        }

                        tasks.$loaded(function (resultTasks) {
                            syncTask.$set(resultTasks.length, task);
                        });

                    }
                }

                $scope.good = true;
                // TODO Listen RoomId Status

            });

        }

    };

})