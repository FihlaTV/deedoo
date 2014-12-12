'use strict';

angular.module('deedoo').factory("Auth", function($firebaseAuth, config) {

  var ref = new Firebase(config.firebaseUrl);

  return $firebaseAuth(ref);
  
});