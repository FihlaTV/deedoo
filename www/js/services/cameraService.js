'use strict';

angular.module('deedoo').factory('camera', function ($q) {

    return {
        getPicture: function (options) {
            var deffered = $q.defer();

            navigator.camera.getPicture(function (result) {
                deffered.resolve(result);
            }, function (err) {
                deffered.reject(err);
            }, options);

            return deffered.promise;
        }
    };

});