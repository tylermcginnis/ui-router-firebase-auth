var app = angular.module('fbAuth');

app.directive('social', function(authService, $state){
  return {
    templateUrl: 'scripts/login-register/social-buttons/social.html',
    restrict: 'E',
    replace: true,
    scope: {
      page: '@'
    },
    link: function(scope, ele, attrs){
        scope.registerWithProvider = function(provider){
          authService.loginWithAuthPopup(provider, function(user){
            if(user){
              $state.go('secure.dashboard');
            }
          });
        };
    }
  }
});