'use strict';

angular.module('deedoo').controller('newTaskController', function ($rootScope, $scope, $state, $firebase, config) {

    var ref     = new Firebase(config.firebaseUrl + 'MEMBERS'),
        sync    = $firebase(ref),
        members = $firebase(ref).$asArray();

    /*
     * List of babysitters on Firebase
     */
    $scope.babysitters = [];
    $scope.parent = config.user;
    console.log($scope.parent);
    if(!$rootScope.firstPassage){
        $rootScope.newTaskForm = {};
        $rootScope.notifications = [
            {
                "added"    : false,
                "title"    : "A fait prout",
                "children" : [],
                'timeStart': "",
                'timeEnd'  : ""
            },
            {
                "added"    : false,
                "title"    : "A fait pipi",
                "children" : [],
                'timeStart': "",
                'timeEnd'  : ""
            },
            {
                "added"    : false,
                "title"    : "A fait caca",
                "children" : [],
                'timeStart': "",
                'timeEnd'  : ""
            }
        ];
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
     * Load all babysitters
     */
    members.$loaded().then(function (result) {
        for (var i = 0; i < result.length; i++) {
            if (members[i].type == 'babysitter') {
                $scope.babysitters.push(members[i]);
            }
        }
    });

    /*
     * Create New Task and seed Notification to the babysitter
     */
    $scope.createTask = function () {

        /*
         * Verifications
         */
        if($rootScope.notificationsCount == 0){ // Must have One notification
            console.log('Must have one or more notification');
        }
        else{
            console.log($rootScope.newTaskForm);
            console.log($rootScope.notifications);
        }

        console.log('Do Stuff...');
    };

    /*
     * Redirect to page for manipulate Notifications
     */
    $scope.newNotification = function () {
        $state.go('notifications');
    };

})