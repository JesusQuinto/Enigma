'use strict';

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('tab', {
      url: "/",
      abstract: true,
      templateUrl: "templates/tab.html"
    })
    .state('tab.inicio', {
      cache: false,
      url: "inicio",
      views:{
        "inicio":{
          templateUrl: "templates/inicio.html"
        }
      }
    })
    .state('tab.encrip', {
      cache: false,
      url: "encrip/quick=:quick",
      views:{
        "inicio":{
          templateUrl: "templates/encriptar.html",
          controller: "encripCtrl"
        }
      }
    })
    .state('tab.acerca', {
      cache: false,
      url: "acerca",
      views:{
        "acerca":{
          templateUrl: "templates/acerca-de.html",
          controller: "helpCtrl"
        }
      }
    });

    /*Si se intenta cargar una vista incorrecta entonces se retorna al inicio */
   $urlRouterProvider.otherwise("/inicio");
});