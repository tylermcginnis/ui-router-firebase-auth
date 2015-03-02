var app = angular.module('fbAuth');

app.controller('SecureCtrl', function($scope, $state, isLoggedIn){
  !isLoggedIn && $state.go('login');
});