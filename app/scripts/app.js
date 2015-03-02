var app = angular.module('fbAuth', ['ui.router', 'firebase']);

app.constant('FBURL', 'https://authallthethings.firebaseio.com');

app.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.when('', '/');
  $urlRouterProvider.otherwise('/login');
  $stateProvider
    .state('home',{
      url: '/',
      templateUrl: 'scripts/home/home.html',
      controller: 'HomeCtrl'
    })
    .state('login',{
      url: '/login',
      templateUrl: 'scripts/login-register/login-logout/login.html',
      controller: 'LoginCtrl'
    })
    .state('logout', {
      url: '/logout',
      templateUrl: 'scripts/login-register/login-logout/logout.html',
      controller: 'LoginCtrl',
      resolve: {
        logout: function(authService){
          authService.logout();
        }
      }
    })
    .state('register', {
      url: '/register',
      templateUrl: 'scripts/login-register/registration/register.html',
      controller: 'RegisterCtrl'
    })
    .state('secure', {
      abstract: true,
      template: '<div ui-view>',
      controller: 'SecureCtrl',
      resolve: {
        isLoggedIn: function(authService){
          return authService.isLoggedIn();
        }
      }
    })
    .state('secure.dashboard', {
      url: '/dashboard',
      templateUrl: 'scripts/secure/dashboard.html',
      controller: 'DashboardCtrl'
    });
});
