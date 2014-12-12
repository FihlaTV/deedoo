'use strict';

angular.module('deedoo').controller('loginController', function($scope, $firebase, config){	

	var ref = new Firebase('https://radiant-inferno-550.firebaseio.com/MEMBERS');
	var members = $firebase(ref).$asArray();	

  	$scope.connect = function () {

  		members.$loaded().then(function(result){

  			for(var i = 0; i < result.length; i++){

  				if(members[i].mail == $scope.data.email && members[i].password == $scope.data.password){
  					config.user = members[i]; // Save User
  					console.log(config.user);
  				}

  			}
			
		});  		

  	};


});