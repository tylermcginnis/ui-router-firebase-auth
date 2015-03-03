var app = angular.module('fbAuth');

app.controller('RegisterCtrl', function($scope, $state, authService){
  $scope.user = {};
  $scope.register = function(){
    var userObj = {
      email: $scope.user.email,
      password: $scope.user.pw
    };

    $scope.user.email = '';
    $scope.user.pw = '';

    authService.createUser(userObj, function(result){
      if(result){
        $state.go('secure.dashboard');
      }
    });
  };

  $scope.registerWithProvider = function(provider){
    authService.loginWithAuthPopup(provider, function(user){
      if(user){
        $state.go('secure.dashboard');
      }
    });
  }
});