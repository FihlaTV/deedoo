'use strict';


/*
 *  Controller of connect.html 
 *  --> Page for: PARENT & BABYSITTER | User connection 
*/ 


angular.module('deedoo').controller('loginController', function ($scope, $state, $filter, $firebase, config) {

    /*
     * Get Informations from Firebase
     */
    var ref     = new Firebase(config.firebaseUrl + 'MEMBERS'),
        members = $firebase(ref).$asArray();


    /*
     * Connect the USER
     */
    $scope.connect = function () {

        if ($scope.data != undefined && $scope.data.email != null && $scope.data.password != null) {

            members.$loaded().then(function (result) {
                var length = result.length-1;

                function searchUser(position)
                {
                    if( position < 0 )
                        console.log('User not found');
                    else if(members[position].mail == $scope.data.email 
                        && members[position].password == $filter('hash')($scope.data.password + config.sold)) 
                    {
                        config.user     = members[position];
                        config.logged       = true;
                        $state.go((members[position].type == 'parent') ? 'newTask' : 'tab.guards');
                    }
                    else
                    {
                        searchUser(position-1);
                    }
                }

                searchUser(length);

            });

        }

    };

});