var app = angular.module('fbAuth');

app.controller('LoginCtrl', function($scope, $state, authService){
  $scope.user = {};
  $scope.login = function(){
    var userObj = {
      email: $scope.user.email,
      password: $scope.user.pw
    };

    $scope.user.email = '';
    $scope.user.pw = '';

    authService.loginWithPW(userObj, function(){
      $state.go('secure.dashboard');
    });
  };
});