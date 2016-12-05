'use strict';

app.factory('router', function () {
   //Declaracion de la clase router  
  //router(registro seleccionado, numero de router, posicion inicial del contador)
  function router(regSelect){
      this.regSelect=angular.copy(regSelect);
      this.regInput= angular.copy(regSelect);
      this.jsonOut={};
      this.abc=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
      this.abcStatic= ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
      this.position=0;
      this.signalOut=false;

      //Colocamos el router en la posicion definida por el usuario
      for (var i = 0; i < this.position; i++) {
        this.abc.push(this.abc.shift());
        this.regInput.push(this.regInput.shift());
      }
  }

  //Definimos el metodo play del objeto router
  //input = letra por encriptar
  //signal = señal que indica si el router anterior giro 25 veces
  router.prototype.encryptInside = function(input,signal){

      //reset signalOut 
      this.signalOut=false;

      //Si el numero de router es igual a 0 itera, de lo contrario iterta si la señal es verdadera
      if(signal == true){

          /*  ---shift---
              The shift() method removes the first item of an array, and returns that item.
              
              ---push---
              The push() method adds new items to the end of an array, and returns the new length.
          */

          //Colocamos el primer elemento de un arreglo en la ultima posicion
          this.abc.push(this.abc.shift());
          this.regInput.push(this.regInput.shift());

          //Aumentamos la posicion a posicion + 1
          this.position+=1;

          //Verificamos si hemos girado mas de 25 veces, ponemos la posicion en 0 y enviamos una senal
          if (this.position > 25) {
            this.signalOut=true;
            this.position=0;
          }
      }

      /*  ---charCodeAt---
          The charCodeAt() method returns the Unicode of the character at the specified index in a string.
      */

      // convierte la entrada  "A" -> 0, "B" -> 1, ... "Z" -> 25
      var inputNumber = (input.charCodeAt() - "A".charCodeAt());

      /* ---indexOf---
          The indexOf() method returns the position of the first occurrence of a specified value in a string.
          
          1) this.abc[inputNumber]  Representa la Variable de entrada dentro del router
          2) this.abc.indexOf(1) Devuelve el numero de la posicion de la (1) en abc
          3) this.regInput[this.regInput.indexOf(2)] Retorna la letra que esta en la posicion de (2) dentro de regInput
      */
      //Proceso de encriptacion:
      var encrypt = this.regInput[this.abc.indexOf(this.abc[inputNumber])];

      // Representa la salida de encrypt en el abcedario estatico
      var out = this.abcStatic[this.abc.indexOf(encrypt)];

      //Objento de retorno
      this.jsonOut = {

          abcCurrent : this.abc, //Contiene la posicion actual del abecedario
          regCurrent : this.regInput, //Contiene la posicion actual del registro de entrada
          position:this.position, //Contiene el Numero actual de la Posicion
          abcInput: this.abc[inputNumber], //Representa la Variable de entrada dentro del router
          abcStatic:this.abcStatic, //Abecedario estatico del sistema
          signalOut: this.signalOut, //Senal que le indica al siguiente router si iterar o no
          input: input, //Contiene la letra de entrada
          encrypt: encrypt, //Variable encriptada dentro del router
          out: out //Contiene la letra de salida
      };

      //Retorno
      return this.jsonOut;
  };

  //input = letra por encriptar (Viene de otro Router)
  router.prototype.encryptOutside = function(input){

      // convierte la entrada  "A" -> 0, "B" -> 1, ... "Z" -> 25
      var inputNumber = (input.charCodeAt() - "A".charCodeAt());

      /* ---indexOf---
          The indexOf() method returns the position of the first occurrence of a specified value in a string.
          
          1) this.abc[inputNumber]  Representa la Variable de entrada dentro del router
          2) this.regInput.indexOf(this.abc[inputNumber]) Devuelve el numero de la posicion de la (1) en regInput
          3) this.abc[this.regInput.indexOf(this.abc[inputNumber])] Retorna la letra que esta en la posicion de (2) dentro de abc
      */
      //Proceso de encriptacion:
      var encrypt = this.abc[this.regInput.indexOf(this.abc[inputNumber])];

      // Representa la salida de encrypt en el abcedario estatico
      var out = this.abcStatic[this.abc.indexOf(encrypt)];

      this.jsonOut = {

          /*  ---JSON.stringify()---
              The JSON.stringify() method converts a JavaScript value to a JSON string
          */
          abcCurrent : this.abc, //Contiene la posicion actual del abecedario
          regCurrent : this.regInput, //Contiene la posicion actual del registro de entrada
          position: this.position, //Contiene el Numero actual de la Posicion
          abcInput: this.abc[inputNumber], //Representa la Variable de entrada dentro del router
          abcStatic:this.abcStatic, //Abecedario estatico del sistema
          input: input, //Contiene la letra de entrada
          encrypt: encrypt, //Variable encriptada dentro del router
          out: out //Contiene la letra de salida
      };

      //Retorno
      return this.jsonOut;
  };


  router.prototype.restart = function() {
    this.abc=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    this.regInput= angular.copy(this.regSelect);  
    this.position= 0;

    return this.abc[0];
  };

  router.prototype.positionCurrent = function() {
    return this.abc[0];
  };

  router.prototype.move = function(newposition) {
   
    // convierte la entrada  "A" -> 0, "B" -> 1, ... "Z" -> 25
    this.position = angular.copy(newposition.charCodeAt() - "A".charCodeAt());
    this.abc=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    this.regInput= angular.copy(this.regSelect); 
    
    //Colocamos el router en la posicion definida por el usuario
    for (var i = 0; i < this.position; i++) {
      this.abc.push(this.abc.shift());
      this.regInput.push(this.regInput.shift());
    }

    return this.abc[0];
  };


  /**
   * Return the constructor function
   */
  return router;
});