'use strict';

angular.module('deedoo').factory('notification', function (config) {
   return{
       add: function (message) {
           localNotification.add(config.idNotification, {
               seconds: 0,
               message: message
           });
           config.idNotification++;
       }
   }
});