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
    console.log("Timer has started! You have 5 seconds to choose!");
    setTimeout(resulttimer, 5000);
    $("#inputcard").html('<h4 class="card-title" id="maythe">Good Luck! <br> You have 5 seconds to choose!</h4>');
  }
}

// When the players choose their move:
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

// setTimeout(resulttimer, 5000);

function resulttimer() {
  console.log("Time is up!");
  // console.log("Player 1 chose:" )
  database.ref().on("value", function(snapshot) {
    var p1choice = snapshot.val().player1.choice;
    var p2choice = snapshot.val().player2.choice;
    var p1name = snapshot.val().player1.name;
    var p2name = snapshot.val().player2.name;

    console.log(p1name + " chose: " + p1choice);
    console.log(p2name + " chose: " + p2choice);

    if (p1choice === "Rock" && p2choice === "Rock") {
      console.log("It was a tie!");
    }

    if (p1choice === "Rock" && p2choice === "Paper") {
      console.log(p2name + " wins!");
    }

    if (p1choice === "Rock" && p2choice === "Scissors") {
      console.log(p1name + " wins!");
    } 

    if (p1choice === "Paper" && p2choice === "Rock") {
      console.log(p1name + " won!");
    }

    if (p1choice === "Paper" && p2choice === "Paper") {
      console.log("It was a tie!");
    }

    if (p1choice === "Paper" && p2choice === "Scissors") {
      console.log(p2name + " wins!");
    }

    if (p1choice === "Scissors" && p2choice === "Rock") {
      console.log(p2name + " wins!");
    }

    if (p1choice === "Scissors" && p2choice === "Paper") {
      console.log(p1name + " wins!");
    }

    if (p1choice === "Scissors" && p2choice === "Scissors") {
      console.log("It was a tie!");
    }

  });

}

$("#start").on("click", start);

// database.ref().on("value", function(snapshot) {
//   var p1choice = snapshot.val().player1.choice;
//   var p2choice = snapshot.val().player2.choice;
//   var p1name = snapshot.val().player1.name;
//   var p2name = snapshot.val().player2.name;
//   console.log(p1name);
//   $("#player1name").html(p1name);
//   $("#player2name").html(p2name);

// });