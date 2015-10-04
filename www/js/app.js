var app = angular.module('starter', ['ionic']);

app.controller('ListCtrl', function($scope) {

  $scope.notes = [
    {
      title: 'First Note',
      description: 'This is my first note.'
    },
    {
      title: 'Second Note',
      description: 'This is my second note.'
    }
  ];

});

app.config(function($stateProvider, $urlRouterProvider) {

  // adds a state
  $stateProvider.state('list', {
    url: '/list',
    templateUrl: 'templates/list.html'
  });

  // adds another state
  $stateProvider.state('edit', {
    url: "/edit",
    templateUrl: "templates/edit.html"
  });


  // if the url doesn't match anything defined before, then redirect to list.
  // REDIRECT!
  $urlRouterProvider.otherwise('/list');
});

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});
