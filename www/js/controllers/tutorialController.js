'use strict';

angular.module('deedoo').controller('tutorialController', function ($scope, $state, localStorage, config) {

    /*
     * If user already have Tutorial -> Redirect to connect
     */
    if (!config.dev) {
        if (localStorage.getTutorial()) {
            $state.go('connect');
        }
    }

    /*
     * When we click on start Experience, we redirect to connect and delete tutorial
     */
    $scope.endTutorial = function () {
        localStorage.setTutorial(true);
        $state.go('connect');
    };

});