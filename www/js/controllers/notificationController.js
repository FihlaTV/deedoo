'use strict';

angular.module('deedoo').controller('notificationController', function ($rootScope, $scope, $state) {

    /*
     * Can't go to this page if notifications are no defined
     */
    if(!angular.isDefined($rootScope.notifications)){
        $state.go('newTask');
        return;
    }
    else{
        $rootScope.firstPassage = true;
    }

    /*
     * Back to current Task adding
     */
    $scope.backTask = function () {
        console.log($scope.notifications);
    };

    /*
     * Change Status Notification
     */
    $scope.confirmNotification = function (id) {
        if ($rootScope.notifications[id].added) {
            $rootScope.notifications[id].added = false
        }
        else {
            $rootScope.notifications[id].added = true;
            console.log($rootScope.notifications[id].added);
        }
    };

    /*
     * Back to createTask
     */
    $scope.backTask = function () {
      $state.go('newTask');
    };
});