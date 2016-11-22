'use strict';

app.controller('encripCtrl', function ($scope, $stateParams, $ionicModal, $timeout, router, wirings, wiringsReflec, reflector, $cordovaClipboard, $cordovaToast, $cordovaSocialSharing) {

  //Definicion de los data-binding usados
  $scope.data = {
    'message' : '',
    'messageOutput':'',
    'abc': ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
    'routers': [
      {
        'obj': new router(wirings[1],0),
        'position':'A'
      },
      {
        'obj': new router(wirings[2],0),
        'position':'A'
      },
      {
        'obj': new router(wirings[3],0),
        'position':'A'
      }
    ]
  };

  //Instanciamos a un objeto router
  //router(registro a usar, numero de router, la posicion de partida)

  //Instanciamos a un objeto reflector
  //router(registro a usar)
  var reflector = new reflector(wiringsReflec[0]);

  function encryptLetter(letter) {
    letter = inside(letter);
    letter = reflector.transf(letter);
    letter = outside(letter);
    return letter;
  }

  function inside(letter) {
    var signal;
    var objectInside1;
    var objectInside2;
    var objectInside3;

    //------------------  router 1 ------------------------
    objectInside1 = $scope.data.routers[0].obj.encryptInside(letter,true);
    console.log(objectInside1.abcCurrent[0]);
    $scope.data.routers[0].position = objectInside1.abcCurrent[0];
    letter = objectInside1.out;
    signal = objectInside1.signalOut;
    console.log(objectInside1.signalOut);
    
    //------------------  router 2 ------------------------
    objectInside2 = $scope.data.routers[1].obj.encryptInside(letter,signal);
    console.log(objectInside2.abcCurrent[0]);
    $scope.data.routers[1].position = objectInside2.abcCurrent[0];
    letter = objectInside2.out;
    signal = objectInside2.signalOut;
    console.log(objectInside2.signalOut);

    //------------------  router 3 ------------------------
    objectInside3 = $scope.data.routers[2].obj.encryptInside(letter,signal);
    console.log(objectInside3.abcCurrent[0]);
    $scope.data.routers[2].position = objectInside3.abcCurrent[0];
    letter = objectInside3.out;
    console.log(objectInside3.signalOut);


    console.log("------------------------------------------------------------------")
    return letter;
  }

  function outside(letter) {
    var objectOutside1;
    var objectOutside2;
    var objectOutside3;

    //------------------  router 3 ------------------------
    objectOutside3 =  $scope.data.routers[2].obj.encryptOutside(letter);
    letter = objectOutside3.out;
    //------------------  router 2 ------------------------
    objectOutside2 =  $scope.data.routers[1].obj.encryptOutside(letter);
    letter = objectOutside2.out;    
    //------------------  router 1 ------------------------
    objectOutside1 =  $scope.data.routers[0].obj.encryptOutside(letter);
    letter = objectOutside1.out;

    return letter;
  }

  //Modal Preferencias
  $ionicModal.fromTemplateUrl('templates/preferencias-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

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
      // An error occured. Show a message to the user
    });
  }

  $scope.cleanOutput = function(){
    $scope.data.messageOutput="";
  }

  $scope.restartRouters = function(){
    $scope.data.routers[0].position = $scope.data.routers[0].obj.restart();
    $scope.data.routers[1].position = $scope.data.routers[1].obj.restart();
    $scope.data.routers[2].position = $scope.data.routers[2].obj.restart();
  }

  $scope.read = function(){
    var message = $scope.data.message
    var messageOutput="";

    //Colocando las letras en Mayuscula
    message =message.toUpperCase();

    for (var i = 0; i < message.length; i++) {
      messageOutput = messageOutput.concat(encryptLetter(message[i]));
    }

    $scope.data.messageOutput= angular.copy(messageOutput);
    $scope.data.message = "";
  }

  $scope.moveRouter = function(routerSelect,newPosition) {
    $scope.data.routers[routerSelect].position = $scope.data.routers[routerSelect].obj.move(newPosition);
  }

});