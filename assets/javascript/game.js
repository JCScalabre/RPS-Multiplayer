 // Initialize Firebase
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

var playerNumber = 1;

$("#start").on("click", start);

function start() {
  console.log("You started the game");
  var player = $(".form-control").val().trim();
  console.log(player);
  console.log(playerNumber);
  playerNumber++;

  database.ref().set({
    player: playerNumber,
    name: player
  })

}