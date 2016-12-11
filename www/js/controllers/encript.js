'use strict';

app.controller('encripCtrl', 
  function
    (
      $scope, 
      $stateParams,
      $cordovaClipboard, 
      $cordovaToast, 
      $cordovaSocialSharing,
      $ionicModal,
      router, 
      wirings, 
      wiringsReflec, 
      reflector,
      plugboard
    ) 
  {

  //Instanciamos el plugboard
  var plugboard = new plugboard();

  //Instanciamos a un objeto reflector
  var reflector = new reflector(wiringsReflec);

  //Instanciamos a los objetos router
  //router(registro a usar)
  var router = [
    {'obj':new router(wirings[0])},
    {'obj':new router(wirings[1])},
    {'obj':new router(wirings[2])}
  ];

  //Definicion de los data-binding usados
  $scope.data = {
    'plugboard': plugboard.registry,
    'wirings':wirings,
    'quick':$stateParams.quick,
    'message' : '',
    'messageOutput':'',
    'abc': [
      'A','B','C','D','E','F',
      'G','H','I','J','K','L',
      'M','N','O','P','Q','R',
      'S','T','U','V','W','X',
      'Y','Z'
    ],
    'routers': [
      {'position':'A'},
      {'position':'A'},
      {'position':'A'}
    ],
    'regSelect': ['0','1','2']
  };

  //main
  $scope.read = function(){
    var message = $scope.data.message
    var messageOutput="";

    //encrypt
    for (var i = 0; i < message.length; i++)
      messageOutput = messageOutput.concat(encryptLetter(message[i]));

    $scope.data.messageOutput= angular.copy(messageOutput);
    $scope.data.message = "";
  }

  //main from Inicio Clasico
  $scope.autoRead = function(){
    var message = $scope.data.message;
    var messageOutput;

    //encrypt
    messageOutput = encryptLetter(message);
    
    $scope.data.messageOutput= $scope.data.messageOutput.concat(messageOutput);
    $scope.data.message = "";
  }

  function encryptLetter(letter) {
    letter = plugboard.transf(letter);
    letter = inside(letter);
    letter = reflector.transf(letter);
    letter = outside(letter);
    letter = plugboard.transf(letter);
    return letter;
  }

  function inside(letter) {
    var signal;
    var objectInside1;
    var objectInside2;
    var objectInside3;

    //router 1 
    objectInside1 = router[0].obj.encryptInside(letter,true);
    $scope.data.routers[0].position = objectInside1.abcCurrent[0];
    letter = objectInside1.out;
    signal = objectInside1.signalOut;
    //router 2 
    objectInside2 = router[1].obj.encryptInside(letter,signal);
    $scope.data.routers[1].position = objectInside2.abcCurrent[0];
    letter = objectInside2.out;
    signal = objectInside2.signalOut;
    //router 3 
    objectInside3 = router[2].obj.encryptInside(letter,signal);
    $scope.data.routers[2].position = objectInside3.abcCurrent[0];
    letter = objectInside3.out;

    return letter;
  }

  function outside(letter) {
    var objectOutside1;
    var objectOutside2;
    var objectOutside3;

    //router 3
    objectOutside3 = router[2].obj.encryptOutside(letter);
    letter = objectOutside3.out;
    //router 2
    objectOutside2 = router[1].obj.encryptOutside(letter);
    letter = objectOutside2.out;    
    //router 1
    objectOutside1 = router[0].obj.encryptOutside(letter);
    letter = objectOutside1.out;

    return letter;
  }

  $scope.copy = function(){
    $cordovaClipboard.copy($scope.data.messageOutput)
    .then(function () {  
      $cordovaToast
      .showShortBottom('Mensaje copiado')
      .then(function(success) {
        // success
      });
    });
  }

  $scope.sharing = function(argument) {
    $cordovaSocialSharing
    .share($scope.data.messageOutput) // Share via native share sheet
    .then(function(result) {
      // Success!
    }, function(err) {
      // error
    });
  }

  $scope.cleanOutput = function(){
    $scope.data.messageOutput="";
  }

  $scope.restartRouters = function(){
    $scope.data.routers[0].position = router[0].obj.restart();
    $scope.data.routers[1].position = router[1].obj.restart();
    $scope.data.routers[2].position = router[2].obj.restart();
  }

  $scope.moveRouter = function(routerSelect,newPosition) {
    $scope.data.routers[routerSelect].position = router[routerSelect].obj.move(newPosition);
  }

  /*Preferences*/

  $ionicModal.fromTemplateUrl('templates/preferences-modal.html', {
    scope: $scope,
    animation: 'scale-in'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.change = function(){
    //Instanciamos a los objetos router
    //router(registro a usar)
    regSelect = $scope.data.regSelect;

    router = [
      {'obj':new router(wirings[$scope.data.regSelect[0]])},
      {'obj':new router(wirings[$scope.data.regSelect[1]])},
      {'obj':new router(wirings[$scope.data.regSelect[2]])}
    ];
  }

  $scope.modify = function(number){
    //transforma un campo undefined en ""
    if ($scope.data.plugboard[number] == undefined) $scope.data.plugboard[number]="";
  
    // convierte la entrada  "A" -> 0, "B" -> 1, ... "Z" -> 25
    var change = ($scope.data.plugboard[number].charCodeAt() - "A".charCodeAt());
    $scope.data.plugboard[change] = $scope.data.abc[number];    

    //Limpia todos los campos que ya tengan la letra asignada a $scope.data.plugboard[number]
    for(var i = $scope.data.plugboard.length-1; i--;){
      if ($scope.data.plugboard[i] === $scope.data.plugboard[number] && i!==number) 
        $scope.data.plugboard[i]="";
      if ($scope.data.plugboard[i] === $scope.data.plugboard[change] && i!==change ) 
        $scope.data.plugboard[i]="";
    } 
  }
});