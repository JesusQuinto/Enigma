'use strict';

app.controller('encripCtrl', 
  function
    (
      $scope, 
      $rootScope,
      $stateParams,
      router, 
      wirings, 
      wiringsReflec, 
      reflector,
      plugboard, 
      $cordovaClipboard, 
      $cordovaToast, 
      $cordovaSocialSharing
    ) 
  {

  //Si el plugboard no esta definido se crea
  if(!$rootScope.plugboard) $rootScope.plugboard = new plugboard();
  console.log($rootScope.plugboard)
  //Definicion de los data-binding usados
  $scope.data = {
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
    ]
  };

  //Instanciamos a los objetos router
  //router(registro a usar, la posicion de partida)
 if(!$rootScope.router){
    //Instanciamos a los objetos router
    //router(registro a usar)
    $rootScope.router = [
      {'obj':new router(wirings[0])},
      {'obj':new router(wirings[1])},
      {'obj':new router(wirings[2])}
    ];
  }

  //Instanciamos a un objeto reflector
  //router(registro a usar)
  var reflector = new reflector(wiringsReflec);

  //main
  $scope.read = function(){
    var message = $scope.data.message
    var messageOutput="";

    //encrypt
    for (var i = 0; i < message.length; i++) {
      messageOutput = messageOutput.concat(encryptLetter(message[i]));
    }

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
    letter = trasfPlugboard(letter);
    letter = inside(letter);
    letter = reflector.transf(letter);
    letter = outside(letter);
    letter = trasfPlugboard(letter);
    return letter;
  }

  function trasfPlugboard(letter){
    /*letter = $rootScope.plugboard.transf(letter);*/
    return letter;
  }

  function inside(letter) {
    var signal;
    var objectInside1;
    var objectInside2;
    var objectInside3;

    //------------------  router 1 ------------------------
    objectInside1 = $rootScope.router[0].obj.encryptInside(letter,true);
    $scope.data.routers[0].position = objectInside1.abcCurrent[0];
    letter = objectInside1.out;
    signal = objectInside1.signalOut;
    
    //------------------  router 2 ------------------------
    objectInside2 = $rootScope.router[1].obj.encryptInside(letter,signal);
    $scope.data.routers[1].position = objectInside2.abcCurrent[0];
    letter = objectInside2.out;
    signal = objectInside2.signalOut;
    
    //------------------  router 3 ------------------------
    objectInside3 = $rootScope.router[2].obj.encryptInside(letter,signal);
    $scope.data.routers[2].position = objectInside3.abcCurrent[0];
    letter = objectInside3.out;

    return letter;
  }

  function outside(letter) {
    var objectOutside1;
    var objectOutside2;
    var objectOutside3;

    //------------------  router 3 ------------------------
    objectOutside3 = $rootScope.router[2].obj.encryptOutside(letter);
    letter = objectOutside3.out;
    //------------------  router 2 ------------------------
    objectOutside2 = $rootScope.router[1].obj.encryptOutside(letter);
    letter = objectOutside2.out;    
    //------------------  router 1 ------------------------
    objectOutside1 = $rootScope.router[0].obj.encryptOutside(letter);
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
      }, function (error) {
        // error
      });
    }, function () {
      // error
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
    $scope.data.routers[0].position = $rootScope.router[0].obj.restart();
    $scope.data.routers[1].position = $rootScope.router[1].obj.restart();
    $scope.data.routers[2].position = $rootScope.router[2].obj.restart();
  }

  $scope.moveRouter = function(routerSelect,newPosition) {
    $scope.data.routers[routerSelect].position = $rootScope.router[routerSelect].obj.move(newPosition);
  }

});