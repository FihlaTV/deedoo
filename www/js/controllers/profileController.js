'use strict';

angular.module('deedoo').controller('profileController', function ($rootScope, $scope, $state, $firebase, config, $filter) {

    /*
     * GetMember
     */
    var ref = new Firebase(config.firebaseUrl + 'MEMBERS/' + config.user.$id),
        syncMember = $firebase(ref);


    $scope.$watch('profilData', function () {

            syncMember.$update({
                'firstname': $scope.profilData.firstname,
                'lastame'  : $scope.profilData.lastname,
                'mail'     : $scope.profilData.mail,
                'password' : $filter('hash')(scope.profilData.password + config.sold),
                'phone'    : $scope.profilData.phone,
                'type'     : (parent) ? 'babysitter' : 'parent'
            }).then(function () {
                // config.user à modifier avec les nouvelles valeurs de l'utlisateurs
                console.log('hey');
            });

        }
    );


});