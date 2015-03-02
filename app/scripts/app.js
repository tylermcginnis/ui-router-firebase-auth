var app = angular.module('fbAuth', ['ui.router', 'firebase']);

app.constant('FBURL', 'https://authallthethings.firebaseio.com');

app.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/login');
  $stateProvider
    .state('login',{
      url: '/login',
      templateUrl: 'scripts/login-register/login.html',
      controller: 'LoginCtrl'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'scripts/login-register/register.html',
      controller: 'RegisterCtrl'
    })
    .state('secure', {
      abstract: true,
      url: 'secured',
      template: '<div ui-view>',
      controller: 'SecureCtrl'
    })
    .state('secure.dashboard', {
      url: '/dashboard',
      templateUrl: 'scripts/secure/dashboard.html',
      controller: 'DashboardCtrl'
    });
});
