'use strict';

angular.module('deedoo').controller('profileController', function ($rootScope, $scope, $state, $firebase, config, camera) {

    /*
     * Must be connect
     */
    if (!config.logged) {
        $state.go('connect');
        return;
    }
    else {
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
    syncMember.$loaded().then(function (result) {
        $scope.profilData = {
            'firstname': result.firstname,
            'lastname' : result.lastname,
            'phone'    : result.phone,
            'email'    : result.mail,
            'picture'  : (result.picture != null) ? result.picture : "",
            'type'     : result.type,
            'password' : 'Motdepasse'
        };
    }).then(function () {

        var sync = $firebase(ref);

        /*
         * If Others informations in ProfilData change
         */
        $scope.$watch('profilData.firstname + profilData.lastname + profilData.mail + profilData.phone + profilData.type + profilData.picture', function () {

                sync.$update({
                    'firstname': $scope.profilData.firstname,
                    'lastname' : $scope.profilData.lastname,
                    'mail'     : $scope.profilData.email,
                    'phone'    : $scope.profilData.phone,
                    /*'type'     : $scope.profilData.type,*/
                    'picture'  : $scope.profilData.picture
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
        $state.go((config.user.type == 'parent') ? 'newTask' : 'tab.guards');
    };

    /*
     * Get picture on the mobile
     */
    $scope.getPicture = function () {
        camera.getPicture().then(function (imageURI) {
            $scope.profilData.picture = imageURI;
        }, function (err) {
            console.err(err);
        }, {
            quality         : 100,
            targetWidth     : 200,
            targetHeight    : 200,
            saveToPhotoAlbum: false
        });
    };
});
