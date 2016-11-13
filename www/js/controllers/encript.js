'use strict';

app.controller('encripCtrl', function ($scope, $stateParams, $ionicModal, router, wirings, wiringsReflec, reflector) {

  //Definicion de los data-binding usados
  $scope.data = {
    'message' : '',
    'messageOutput':'',
    'routerPosition1':'',
    'routerPosition2':'',
    'routerPosition3':''
  };

  //Modal Preferencias
  $ionicModal.fromTemplateUrl('templates/preferencias-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  //Instanciamos a un objeto router
  //router(registro a usar, numero de router, la posicion de partida)
  var router1 = new router(wirings[1],0);
  var router2 = new router(wirings[2],0);
  var router3 = new router(wirings[3],0);

  //Instanciamos a un objeto reflector
  //router(registro a usar)
  var reflector = new reflector(wiringsReflec[0]);

  function encryptLetter(letter) {
    var signal;
    var objectInside1;
    var objectInside2;
    var objectInside3;

    var objectOutside1;
    var objectOutside2;
    var objectOutside3;

    //Inside
    //------------------  router 1 ------------------------
    objectInside1 = router1.encryptInside(letter,true);
    $scope.data.routerPosition1 = objectInside1.abcCurrent[0];
    letter = objectInside1.out;
    signal = objectInside1.signalOut;
    

    //------------------  router 2 ------------------------
    objectInside2 = router2.encryptInside(letter,signal);
    $scope.data.routerPosition2 = objectInside2.abcCurrent[0];
    letter = objectInside2.out;
    signal = objectInside2.signalOut;


    //------------------  router 3 ------------------------
    objectInside3 = router3.encryptInside(letter,signal);
    $scope.data.routerPosition3 = objectInside3.abcCurrent[0];
    letter = objectInside3.out;

    //Reflector
    letter = reflector.transf(letter);
    
    //Outside
    //------------------  router 3 ------------------------
    objectOutside3 = router3.encryptOutside(letter);
    letter = objectOutside3.out;
    //------------------  router 2 ------------------------
    objectOutside2 = router2.encryptOutside(letter);
    letter = objectOutside2.out;    
    //------------------  router 1 ------------------------
    objectOutside1 = router1.encryptOutside(letter);
    letter = objectOutside1.out;


    return letter;
  }


  $scope.read = function(){

    var message = $scope.data.message
    var messageOutput="";

    //Limpiando Mensaje por encriptar
    message = message.replace(/ /g,'');
    message =message.toUpperCase();

    for (var i = 0; i < message.length; i++) {
      messageOutput = messageOutput.concat(encryptLetter(message[i]));
    }

    $scope.data.messageOutput= messageOutput;
    $scope.data.message = "";
  }
});