'use strict';

app.controller('helpCtrl', function ($scope, $cordovaInAppBrowser, $cordovaToast, $cordovaClipboard) {

	var options = {
      location: 'yes',
      clearcache: 'yes',
      toolbar: 'no'
    };

	$scope.wikipediaG = function(){
		$cordovaInAppBrowser.open('https://en.wikipedia.org/wiki/Enigma_machine', '_blank', options)	
	    .catch(function(event) {
	        $cordovaToast.showShortBottom('Pagina no Disponible');
	    });
  	}

	$scope.wikipediaC = function(){
		$cordovaInAppBrowser.open('https://en.wikipedia.org/wiki/Cryptanalysis_of_the_Enigma', '_blank', options)	
	    .catch(function(event) {
	        $cordovaToast.showShortBottom('Pagina no Disponible');
	    });
  	}

	$scope.github = function(){
		$cordovaInAppBrowser.open('https://github.com/JesusQuinto/enigma', '_blank', options)	
	    .catch(function(event) {
	        $cordovaToast.showShortBottom('Pagina no Disponible');
	    });
  	}

	$scope.githubM = function(){
		$cordovaInAppBrowser.open('https://github.com/ULAnux/mathematica', '_blank', options)	
	    .catch(function(event) {
	        $cordovaToast.showShortBottom('Pagina no Disponible');
	    });
  	}

  	$scope.emailJK = function(){
	    $cordovaClipboard.copy("jesuskinto@gmail.com")
	    .then(function (){  
	      $cordovaToast.showShortBottom('Correo copiado');
	    });
  	}

  	$scope.emailED = function(){
	    $cordovaClipboard.copy("Eduardodaboinaraujo@gmail.com")
	    .then(function (){  
	      $cordovaToast.showShortBottom('Correo copiado');
	    });
  	}

  	$scope.twitterJK = function(){
	    $cordovaClipboard.copy("@Jesus5to")
	    .then(function (){  
	      $cordovaToast.showShortBottom('Twitter copiado');
	    });
  	}

  	$scope.twitterM = function(){
	    $cordovaClipboard.copy("@jacintodavila")
	    .then(function (){  
	      $cordovaToast.showShortBottom('Twitter copiado');
	    });
  	}
});