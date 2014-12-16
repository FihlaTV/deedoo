'use strict';

angular.module('deedoo').controller('profileController', function ($rootScope, $scope, $state, $firebase, config, $filter) {

    /*
     * Must be connect
     */
    if(!config.logged){
        $state.go('connect');
        return;
    }
    else{
        $scope.profilData = {};
    }

    /*
     * GetMember
     */
    var ref         = new Firebase(config.firebaseUrl + 'MEMBERS/' + config.user.$id),
        syncMember  = $firebase(ref).$asObject();

    /*
     * Informations Users From Firebase
     */
    syncMember.$loaded().then(function(result){
        $scope.profilData = {
            'firstname' : result.firstname,
            'lastname'  : result.lastname,
            'phone'     : result.phone,
            'email'     : result.mail,
            'picture'   : result.picture,
            'type'      : result.type,
            'password'  : result.password
        };
    }).then(function() {

        var sync = $firebase(ref);

        /*
         * If Others informations in ProfilData change
         */
        $scope.$watch('profilData.firstname + profilData.lastname + profilData.mail + profilData.phone + profilData.type', function () {

                sync.$update({
                    'firstname': $scope.profilData.firstname,
                    'lastname'  : $scope.profilData.lastname,
                    'mail'     : $scope.profilData.email,
                    'phone'    : $scope.profilData.phone,
                    'type'     : $scope.profilData.type
                }).then(function () {
                    console.log('Hey');
                });

            }
        );
    });

    /*
     * Buttons Back
     */
    $scope.back = function () {
        $state.go((config.user.type == 'parent') ? 'newTask': 'tab.guards');
    };

});
