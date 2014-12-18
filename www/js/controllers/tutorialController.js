'use strict';


/*
 *  Controller of tutorial.html 
 *  --> Page for: what or why Deedoo ?
*/ 


angular.module('deedoo').controller('tutorialController', function ($scope, $state, localStorage, config) {

    /*
     * If user already have Tutorial -> Redirect to connect
     */
    if (!config.dev) {
        if (localStorage.getTutorial()) {
            if(config.logged){
                if(config.user.type == 'babysitter'){
                    $state.go('tab.guards');
                }
            }
            else{
                $state.go('connect');
            }

        }
    }
    else{
        if(config.user.type == 'babysitter'){
            $state.go('tab.guards');
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