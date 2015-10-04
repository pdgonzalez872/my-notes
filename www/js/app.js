(function(){

  var notes = [];

  var app = angular.module('starter', ['ionic']);

    app.config(function($stateProvider, $urlRouterProvider) {

      // adds list/index
      $stateProvider.state('list', {
        url: '/list',
        templateUrl: 'templates/list.html'
      });

      $stateProvider.state('add', {
        url: '/add',
        templateUrl: 'templates/edit.html',
        controller: 'AddCtrl'
      });

      // adds edit state
      $stateProvider.state('edit', {
        url: "/edit/:noteId",
        templateUrl: "templates/edit.html",
        controller: 'EditCtrl'
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

      function createNote(note){
        notes.push(note);
      }

      // uses the scope service as well as the state service
      app.controller('ListCtrl', function($scope, $state) {

        $scope.notes = notes;

      });

      app.controller('AddCtrl', function($scope, $state){
        $scope.note = {
          id: new Date().getTime().toString(),
          title: '',
          description: ''
        };

        $scope.save = function(){
          createNote($scope.note);
          $state.go('list');
        }

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
