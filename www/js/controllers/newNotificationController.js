'use strict';


/*
 *  Controller of new_notification.html 
 *  --> Page for: PARENT | Creation of custom notification
*/ 


angular.module('deedoo').controller('newNotificationController', function ($rootScope, $scope, $state, config) {

    /*
     * Must be connect
     */
    if (!config.logged) {
        $state.go('connect');
        return;
    }
    else{
        $scope.parent   = config.user;
        $scope.children = {};
    }

    /*
     * Create Object content (child name and status)
     */
    for (var i in $scope.parent.children) {
        $scope.children[i] = {
            'name'  : $scope.parent.children[i],
            'status': false
        };
    }

    /*
     * Create new Notification
     */
    $scope.createNewNotification = function () {

        var notification = {
            "added"    : true,
            "title"    : $scope.newNotificationData.title,
            "timeStart": ($scope.newNotificationData.timeStart) ? $scope.newNotificationData.timeStart : "",
            "timeEnd"  : ($scope.newNotificationData.timeEnd) ? $scope.newNotificationData.timeEnd : "",
            "other"    : $scope.newNotificationData.other,
            "children" : null
        };

        if ($scope.newNotificationData.children != null) {
            notification.children = [];
            for (var i in $scope.children) {
                if ($scope.newNotificationData.children[i]) {
                    notification.children.push($scope.children[i].name);
                }
            }
        }

        $rootScope.notifications.push(notification);
        $state.go('notifications');
    };

});