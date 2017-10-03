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

// Start Function:
function start() {

  var player = $(".form-control").val().trim();

  database.ref("/player" + playerNumber).set({
    player: playerNumber,
    name: player
  })

  $("#player" + playerNumber + "name").html(player);

  $("#playernumber").html("Enter Player 2's Name");

  $(".form-control").val("");

  playerNumber++;

  // If both players have entered their name:
  if (playerNumber === 3) {
    $("#inputcard").html('<h4 class="card-title" id="maythe">May the best win!</h4>');
  }
}

var p1choice;

var p2choice;

function playerchoices() {

  $("#R1").on("click", function() {
    database.ref("/player1").update({
      choice: "Rock"
    });
  })

  $("#P1").on("click", function() {
    database.ref("/player1").update({
      choice: "Paper"
    });
  })

  $("#S1").on("click", function() {
    database.ref("/player1").update({
      choice: "Scissors"
    });
  })

  $("#R2").on("click", function() {
    database.ref("/player2").update({
      choice: "Rock"
    });
  })

  $("#P2").on("click", function() {
    database.ref("/player2").update({
      choice: "Paper"
    });
  })

  $("#S2").on("click", function() {
    database.ref("/player2").update({
      choice: "Scissors"
    });
  })

};

playerchoices();