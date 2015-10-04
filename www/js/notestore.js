angular.module('mynotes.notestore', [])
// the function we pass in the next line returns a service object
  .factory('NoteStore', function(){

    // must check if there is data already and if so, convert it from json.
    // if not, then use the empty array as string to start things up
    var notes = angular.fromJson(window.localStorage['notes'] || "[]");

    function persist(){
      // uses angular to convert to notes
      window.localStorage['notes'] = angular.toJson(notes);
    }

      return {

        list: function(){
          return notes;
        },

        get: function(noteId){
          for (var i = 0; i < notes.length; i++){
            if(notes[i].id === noteId){
              return notes[i];
            }
          }
          return undefined;
        },

        create: function(note){
          notes.push(note);
          persist();
        },

        update: function(note){
          for (var i = 0; i < notes.length; i++){
            if (notes[i].id === note.id){
              notes[i] = note;
              persist();
              return;
            }
          }
        },
        remove: function(noteId){
          for (var i = 0; i < notes.length; i++){
            if (notes[i].id === noteId){
              notes.splice(i, 1);
              persist();
              return;
            }
          }
        }

    }
})
