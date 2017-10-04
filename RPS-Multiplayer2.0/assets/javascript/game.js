 var config = {
  apiKey: "AIzaSyDCw9WJFY-BBqYlEN8fF97WUBkVjycnvpI",
  authDomain: "rps-multiplayer-1029e.firebaseapp.com",
  databaseURL: "https://rps-multiplayer-1029e.firebaseio.com",
  projectId: "rps-multiplayer-1029e",
  storageBucket: "",
  messagingSenderId: "560544655721"
};

firebase.initializeApp(config);

var database = firebase.database();

// When the submit button is clicked:
$("#submit").on("click", function() {
  var name = $(".form-control").val();
  database.ref().push({
    name: name
  });
});

database.ref().on("child_added", function(snapshot) {
  var name = snapshot.val().name;
  console.log("Player 1: " + name);
})