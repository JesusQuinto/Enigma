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
      reflector,
      plugboard,
      wirings
    ) 
  {

  //Instanciamos el plugboard y el reflector
  var plugboard = new plugboard();
  var reflector = new reflector();

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
    var output;

    //router 1 
    output = router[0].obj.encryptInside(letter,true);
    $scope.data.routers[0].position = output.abcCurrent[0];
    letter = output.out;
    signal = output.signalOut;
    //router 2 
    output = router[1].obj.encryptInside(letter,signal);
    $scope.data.routers[1].position = output.abcCurrent[0];
    letter = output.out;
    signal = output.signalOut;
    //router 3 
    output = router[2].obj.encryptInside(letter,signal);
    $scope.data.routers[2].position = output.abcCurrent[0];
    letter = output.out;

    return letter;
  }

  function outside(letter) {
    var output;

    //router 3
    output = router[2].obj.encryptOutside(letter);
    letter = output;
    //router 2
    output = router[1].obj.encryptOutside(letter);
    letter = output;    
    //router 1
    output = router[0].obj.encryptOutside(letter);
    letter = output;

    return letter;
  }

  $scope.copy = function(){
    $cordovaClipboard.copy($scope.data.messageOutput)
    .then(function (){  
      $cordovaToast
      .showShortBottom('Mensaje copiado');
    });
  }

  $scope.sharing = function(argument) {
    $cordovaSocialSharing
    .share($scope.data.messageOutput);
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
    router = [
      {'obj':new router(wirings[$scope.data.regSelect[0]])},
      {'obj':new router(wirings[$scope.data.regSelect[1]])},
      {'obj':new router(wirings[$scope.data.regSelect[2]])}
    ];
  }

  $scope.modify = function(number){
    //transforma un campo undefined en ""
    if ($scope.data.plugboard[number] == undefined) $scope.data.plugboard[number]="";
    $scope.data.plugboard[number] = $scope.data.plugboard[number].slice(-1);
  
    var change = ($scope.data.plugboard[number].charCodeAt() - "A".charCodeAt());
    $scope.data.plugboard[change] = $scope.data.abc[number];    

    //Limpia todos los campos que ya tengan la letra asignada a $scope.data.plugboard[number]
    for(var i = $scope.data.plugboard.length; i--;){
      if ($scope.data.plugboard[i] === $scope.data.plugboard[number] && i!==number) 
        $scope.data.plugboard[i]="";
      if ($scope.data.plugboard[i] === $scope.data.plugboard[change] && i!==change ) 
        $scope.data.plugboard[i]="";
    } 
  }
});