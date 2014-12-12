'use strict';

angular.module('deedoo').controller('tutorialController', function ($scope, $state, config) {

    /*
     * When we click on start Experience, we redirect to connect and delete tutorial
     */
    $scope.endTutorial = function () {
        config.intro = true;
        $state.go('connect');
    };
    
});