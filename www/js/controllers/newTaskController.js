'use strict';

angular.module('deedoo').controller('newTaskController', function ($rootScope, $scope, $state, $firebase, config) {

    var ref     = new Firebase(config.firebaseUrl + 'MEMBERS'),
        sync    = $firebase(ref),
        members = $firebase(ref).$asArray();

    /*
     * List of babysitters on Firebase
     */
    $scope.babysitters = [];
    $rootScope.NotificationsCount = 0;

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
        console.log('Do Stuff...');
    };

    /*
     * Redirect to page for manipulate Notifications
     */
    $scope.newNotification = function () {
        $state.go('notifications');
    };

})