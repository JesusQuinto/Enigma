'use strict';

app.controller('preferencesCtrl', function ($scope, $rootScope, plugboard, wirings,router) {
	

  if(!$rootScope.plugboard) $rootScope.plugboard = new plugboard();

	$scope.data = {
   'plugboard': $rootScope.plugboard.registry,
   'wirings':wirings,
   'abc':[
    'A','B','C','D','E','F',
    'G','H','I','J','K','L',
    'M','N','O','P','Q','R',
    'S','T','U','V','W','X',
    'Y','Z'
    ],
    'regSelect': $rootScope.regSelect ? $rootScope.regSelect : ['0','1','2']
  };

  if(!$rootScope.router){
    //Instanciamos a los objetos router
    //router(registro a usar)
    $rootScope.router = [
      {'obj':new router(wirings[0])},
      {'obj':new router(wirings[1])},
      {'obj':new router(wirings[2])}
    ];
  }

  console.log($rootScope.plugboard);
  

  
  $scope.change = function(){
    //Instanciamos a los objetos router
    //router(registro a usar)
    $rootScope.regSelect = $scope.data.regSelect;

    $rootScope.router = [
      {'obj':new router(wirings[$scope.data.regSelect[0]])},
      {'obj':new router(wirings[$scope.data.regSelect[1]])},
      {'obj':new router(wirings[$scope.data.regSelect[2]])}
    ];
  }

  $scope.modify = function(number){
		if($scope.data.plugboard[number]){

      // convierte la entrada  "A" -> 0, "B" -> 1, ... "Z" -> 25
      var change = ($scope.data.plugboard[number].charCodeAt() - "A".charCodeAt());
      $scope.data.plugboard[change] = $scope.data.abc[number];    

      //Limpia todos los campos que ya tengan la letra asignada a $scope.data.plugboard[number]
      for(var i = $scope.data.plugboard.length-1; i--;){
        if ($scope.data.plugboard[i] === $scope.data.plugboard[number] && i!==number) $scope.data.plugboard[i]="";
        if ($scope.data.plugboard[i] === $scope.data.plugboard[change] && i!==change ) $scope.data.plugboard[i]="";
      }
		}
  }
});