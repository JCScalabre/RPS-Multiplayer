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

var playerNumber;

// When we load the page:
function startup() {

  // Log number 1 into playerNumber variable:
  database.ref("variables").set({
    playerNumber: 1
  });

  // Get variable playerNumber from Firebase and add it to DOM:
  database.ref().on("value", function(snapshot) {
    playerNumber = snapshot.val().variables.playerNumber
    $("#playerheader").html(playerNumber);
    $("#submit").attr("button-number", playerNumber);
  });

}

// Main code:
startup();

$("#submit").on("click", function() {

  var name = $(".form-control").val();

  var buttonNumber = parseInt($("#submit").attr("button-number"));
  // console.log(parseInt(buttonNumber));

  if (buttonNumber === 1) {
    buttonNumber++;

    $("#player1name").html(name);

    database.ref("/players/player1").set({
      name: name
    });

    database.ref("/variables").set({
      playerNumber: buttonNumber
    });

    $("#topcard").html("<h4 id='pname'> Good luck " + name + "!</h4>")

    $("#p1box").css("display", "block");

  }

  else {

    buttonNumber++

    $("#player2name").html(name);
    
    database.ref("/players/player2").set({
      name: name
    });

    database.ref("variables").update({
      playerNumber: buttonNumber
    });

    $("#topcard").html("<h4 id='pname'> Good luck " + name + "!</h4>");

    $("#p2box").css("display", "block");

    console.log("Game has started");

  }

});

// All the choice button functions:
function buttonfunctions() {
  $("#R1").on("click",function() {
    $("#R1").css("background", "#007bff");
    $("#R1").css("color", "white");  
    $("#P1").css("background", "white");
    $("#P1").css("color", "#007bff");
    $("#S1").css("background", "white");
    $("#S1").css("color", "#007bff");
    $("#ready1").css("display", "block");
    database.ref("/players/player1").update({
      choice: "Rock"
    });
  })

  $("#P1").on("click",function() {
    $("#P1").css("background", "#007bff");
    $("#P1").css("color", "white");
    $("#R1").css("background", "white");
    $("#R1").css("color", "#007bff");
    $("#S1").css("background", "white");
    $("#S1").css("color", "#007bff");
    $("#ready1").css("display", "block");
    database.ref("/players/player1").update({
      choice: "Paper"
    });
  })

  $("#S1").on("click",function() {
    $("#S1").css("background", "#007bff");
    $("#S1").css("color", "white");
    $("#R1").css("background", "white");
    $("#R1").css("color", "#007bff");
    $("#P1").css("background", "white");
    $("#P1").css("color", "#007bff");
    $("#ready1").css("display", "block");
    database.ref("/players/player1").update({
      choice: "Scissors"
    });
  })

  $("#R2").on("click",function() {
    $("#R2").css("background", "#007bff");
    $("#R2").css("color", "white");  
    $("#P2").css("background", "white");
    $("#P2").css("color", "#007bff");
    $("#S2").css("background", "white");
    $("#S2").css("color", "#007bff");
    $("#ready2").css("display", "block");

    database.ref("/players/player2").update({
      choice: "Rock"
    });
  })

  $("#P2").on("click",function() {
    $("#P2").css("background", "#007bff");
    $("#P2").css("color", "white");
    $("#R2").css("background", "white");
    $("#R2").css("color", "#007bff");
    $("#S2").css("background", "white");
    $("#S2").css("color", "#007bff");
    $("#ready2").css("display", "block");
    database.ref("/players/player2").update({
      choice: "Paper"
    });
  })

  $("#S2").on("click",function() {
    $("#S2").css("background", "#007bff");
    $("#S2").css("color", "white");
    $("#R2").css("background", "white");
    $("#R2").css("color", "#007bff");
    $("#P2").css("background", "white");
    $("#P2").css("color", "#007bff");
    $("#ready2").css("display", "block");
    database.ref("/players/player2").update({
      choice: "Scissors"
    });
  })
}

buttonfunctions();

function ready() {

  $("#ready1").on("click", function() {
    console.log("Player 1 is ready!");
    database.ref("/variables/readystate").update({
      player1: "ready"
    })
  });

  $("#ready2").on("click", function() {
    console.log("Player 2 is ready!");
    database.ref("/variables/readystate").update({
      player2: "ready"
    });
  });

  database.ref("/variables/readystate").on("value", function(snapshot) {
    var ready = snapshot.numChildren();

  database.ref("/players").on("value", function(snapshot) {
    var p1name = snapshot.val().player1.name;
    var p2name = snapshot.val().player2.name;
    // console.log(p1name);
    // console.log(p2name);
    var p1choice = snapshot.val().player1.choice;
    var p2choice = snapshot.val().player2.choice;
    // console.log(p1choice, p2choice);
    var winnername;

    if (p1choice === "Rock" && p2choice === "Rock") {
      winnername = "Both players chose Rock, <br> It was a tie!";
    }

    if (p1choice === "Rock" && p2choice === "Paper") {
      winnername = p1name + " chose: " + p1choice + " <br>" + p2name + " chose: " + p2choice + "<br>" + p2name + " wins!";
    }

    if (p1choice === "Rock" && p2choice === "Scissors") {
      winnername = p1name + " chose: " + p1choice + " <br>" + p2name + " chose: " + p2choice + "<br>" + p1name + " wins!";
    } 

    if (p1choice === "Paper" && p2choice === "Rock") {
      winnername = p1name + " chose: " + p1choice + " <br>" + p2name + " chose: " + p2choice + "<br>" + p1name + " wins!";
    }

    if (p1choice === "Paper" && p2choice === "Paper") {
      winnername = "Both players chose Paper, <br> It was a tie!";
    }

    if (p1choice === "Paper" && p2choice === "Scissors") {
      winnername = p1name + " chose: " + p1choice + " <br>" + p2name + " chose: " + p2choice + "<br>" + p2name + " wins!";
    }

    if (p1choice === "Scissors" && p2choice === "Rock") {
      winnername = p1name + " chose: " + p1choice + " <br>" + p2name + " chose: " + p2choice + "<br>" + p2name + " wins!";
    }

    if (p1choice === "Scissors" && p2choice === "Paper") {
      winnername = p1name + " chose: " + p1choice + " <br>" + p2name + " chose: " + p2choice + "<br>" + p1name + " wins!";
    }

    if (p1choice === "Scissors" && p2choice === "Scissors") {
      winnername = "Both players chose Scissors, <br> It was a tie!";
    }

        if (ready === 2){
      console.log("Both players are ready!");
      $("#winner").css("display", "block");
      $("#winnername").html(winnername);
    }

  });

  })

}

ready();

// Old code: 

// var playerNumber = 1;


// function startup () {

//   database.ref("/variables").set({
//     playerNumber: "1",
//   });


//   database.ref().on("value", function(snapshot) {
//     // console.log(snapshot.val().variables.playerNumber);
//     $("#playerheader").html(snapshot.val().variables.playerNumber);

//   })

// }

// // database.ref().on("value", function(snapshot) {
// //   // console.log(snapshot.val().players.player1.player+1);
// //   $("#playerheader").html(snapshot.val().players.player1.player+1);
// // });

// startup();

// // When the submit button is clicked for the first time:
// $("#submit").on("click", function() {

//   var name = $(".form-control").val();

//   if (playerNumber < 3) {
//     database.ref("/players/player" + playerNumber).set({
//       name: name,
//     });

//   playerNumber++;

//   database.ref("/variables").set({
//     playerNumber: playerNumber
//   });


//   $("#playername").html(name);



//     $("#submit").attr("id", "submit2");
//   }

//   // $("#submit2").on("click", function() {
//   //   console.log("You pressed button 2");
//   //   $("#topcard").html("<h4>Good Luck!</h4>")
//   // })

// });

// // database.ref().on("child_added", function(snapshot) {
// //   var name = snapshot.val().name;
// //   console.log("Player 1: " + name);
// // })