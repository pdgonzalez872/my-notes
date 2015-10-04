(function(){

  var notes = [
    {
      id: '1',
      title: 'First Note',
      description: 'This is my first note.'
    },
    {
      id: '2',
      title: 'Second Note',
      description: 'This is my second note.'
    }
  ];

  var app = angular.module('starter', ['ionic']);

    app.config(function($stateProvider, $urlRouterProvider) {

      // adds a state
      $stateProvider.state('list', {
        url: '/list',
        templateUrl: 'templates/list.html'
      });

      // adds another state
      $stateProvider.state('edit', {
        url: "/edit/:noteId",
        templateUrl: "templates/edit.html"
      });

      // if the url doesn't match anything defined before, then redirect to list.
      // REDIRECT!
      $urlRouterProvider.otherwise('/list');
      });

      function getNote(noteId){
        for (var i = 0; i < notes.length; i++){
          if(notes[i].id === noteId){
            return notes[i];
          }
        }
        return undefined;
      }

      function updateNote(note){
        for (var i = 0; i < notes.length; i++){
          if (notes[i].id === note.id){
            notes[i] = note;
            return;
          }
        }
      }

      // uses the scope service as well as the state service
      app.controller('ListCtrl', function($scope, $state) {

        $scope.notes = notes;

      });

      app.controller('EditCtrl', function($scope, $state){
        $scope.note = angular.copy(getNote($state.params.noteId));

        $scope.save = function(){
          updateNote($scope.note);
          $state.go('list');
        }
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

}());
