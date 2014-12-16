'use strict';

angular.module('deedoo').controller('notificationController', function ($rootScope, $scope, $state) {

    /*
     * Must be connect
     */
    if(!config.logged){
        $state.go('connect');
        return;
    }

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
     * Change Status Notification
     */
    $scope.confirmNotification = function (id) {
        $rootScope.notifications[id].added = ($rootScope.notifications[id].added) ? false : true;
    };

    /*
     * Back to createTask
     */
    $scope.backTask = function () {
      $state.go('newTask');
    };

});