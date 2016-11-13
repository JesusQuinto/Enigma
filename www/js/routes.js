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
      url: "encrip/:speed",
      views:{
        "inicio":{
          templateUrl: "templates/encriptar.html",
          controller: "encripCtrl"
        }
      }
    })
    .state('tab.guia', {
      cache: false,
      url: "guia",
      views:{
        "guia":{
          templateUrl: "templates/guia.html"
        }
      }
    })
    .state('tab.guia-rapida', {
      url: "guia-rapida",
        views:{
          "guia":{
            templateUrl: "templates/guia-rapida.html"
        }
      }
    })
    .state('tab.como-funciona', {
      url: "como-funciona",
      views:{
        "guia":{
          templateUrl: "templates/como-funciona.html"
        }
      }
    });

    /*Si se intenta cargar una vista incorrecta entonces se retorna al inicio */
   $urlRouterProvider.otherwise("/inicio");
});