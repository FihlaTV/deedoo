'use strict';

angular.module('deedoo').controller('subscribeController', function($scope, $firebase, config){	

	var ref       = new Firebase('https://radiant-inferno-550.firebaseio.com/MEMBERS');
  var sync      = $firebase(ref);
  var members   = $firebase(ref).$asArray();
  var good      = true;

	$scope.subsribe = function () {

    members.$loaded().then(function(result){

      // User with the same Mail OR phone can't subscribe
      for(var i = 0; i < result.length; i++){
        if(members[i].mail == $scope.data.email){
          good += '[INVALID] : Same EMail';
        }
        else if (members[i].phone == $scope.data.phone){
          good += '[INVALID] : Same Phone'
        }
      }

      // If Good Subscribe
      if(good){
          sync.$set(result.length, {
            "children"  : [ "Emilie", "Mathieu" ],
            "firstname" : "Isabelle",
            "lastname"  : "Le Tyrant",
            "mail"      : "isabelle.letyrant@laposte.net",
            "password"  : "motdepasse",
            "phone"     : "01.02.03.04.05",
            "type"      : "parent"
        });
      }


    });  

	};

});