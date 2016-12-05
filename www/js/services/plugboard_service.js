'use strict';

app.factory('plugboard', function () {
  //Declaracion de la clase plugboard  
  //plugboard(registro seleccionado)
  function plugboard(){
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

  plugboard.prototype.transf = function(letter){
    var letterPosition = (letter.charCodeAt() - "A".charCodeAt());
    if (this.registry[letterPosition]=="") {
      return letter;
    }
    else return this.registry[letterPosition];
  }

  return plugboard;
});