'use strict';

app.controller('preferencesCtrl', function ($scope, wiringsReflec, wirings) {
	
	$scope.data = {
   'plugboard': wiringsReflec,
   'wirings':wirings,
   'abc':[
    'A','B','C',
    'D','E','F',
    'G','H','I',
    'J','K','L',
    'M','N','O',
    'P','Q','R',
    'S','T','U',
    'V','W','X',
    'Y','Z'
    ],
   'regSelect':[0,1,2]
  };
  
  $scope.change = function(){
    console.log($scope.data.regSelect);
  }

  $scope.modify = function(number){
		if($scope.data.plugboard[number]){
			// convierte la entrada  "A" -> 0, "B" -> 1, ... "Z" -> 25
    	var change = ($scope.data.plugboard[number].charCodeAt() - "A".charCodeAt());
    	$scope.data.plugboard[change] = $scope.data.abc[number];			
		}
  }
});