'use strict';

app.factory('reflector', function () {
   //Declaracion de la clase reflector  
  //reflector(registro seleccionado)
  function reflector(regSelect){
    this.regSelect= angular.copy(regSelect);
  }

  reflector.prototype.transf = function(input){
    // convierte la entrada  "A" -> 0, "B" -> 1, ... "Z" -> 25
    var inputNumber = (input.charCodeAt() - "A".charCodeAt());
    var output = this.regSelect[inputNumber];
    return output;
  }

  return reflector;
});