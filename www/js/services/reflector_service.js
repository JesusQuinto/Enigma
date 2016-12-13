'use strict';

app.factory('reflector', function () {
  //Declaracion de la clase reflector
  function reflector(){
    this.registry= [
      'E','K','M','F',
      'A','D','G','Q',
      'V','Z','B','T',
      'C','W','Y','X',
      'H','U','S','L',
      'R','I','N','P',
      'O','J'
    ];
  }

  reflector.prototype.transf = function(input){
    var inputNumber = (input.charCodeAt() - "A".charCodeAt());
    return this.registry[inputNumber]; 
  }

  return reflector;
});