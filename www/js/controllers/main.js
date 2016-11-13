'use strict';

app.controller('main', function ($scope, $ionicModal) {
  $ionicModal.fromTemplateUrl('templates/nosotros-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
});