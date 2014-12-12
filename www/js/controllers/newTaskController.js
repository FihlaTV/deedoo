'use strict';

angular.module('deedoo').controller('newTaskController', function ($scope, $firebase, config){

    var ref         = new Firebase(config.firebaseUrl + 'MEMBERS'),
        sync        = $firebase(ref),
        members     = $firebase(ref).$asArray();

    // List of Babysitters
    $scope.babysitters = [];

    members.$loaded().then(function (result) {
        for (var i = 0; i < result.length; i++) {
            if(members[i].type == 'babysitter'){
                $scope.babysitters.push(members[i]);
            }
        }
    });

})