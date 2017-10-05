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
    $("#check1").css("visibility", "visible");
    database.ref("/variables/readystate").update({
      player1: "ready"
    })
  });

  $("#ready2").on("click", function() {
    console.log("Player 2 is ready!");
    $("#check2").css("visibility", "visible");
    database.ref("/variables/readystate").update({
      player2: "ready"
    });
  });

  database.ref("/variables/readystate").on("value", function(snapshot) {
    var ready = snapshot.numChildren();
    console.log("Ready: " + ready)

    database.ref("/players").on("value", function(snapshot) {
      var p1name = snapshot.val().player1.name;
      var p2name = snapshot.val().player2.name;
      var p1choice = snapshot.val().player1.choice;
      var p2choice = snapshot.val().player2.choice;
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

// playagain();

function playagain() {
  $("#playagain").on("click", function() {
    database.ref("/variables/readystate").set({
    });
    database.ref("/variables/playagainstate").set({
      playagain: true
    })
  });

  database.ref("/variables/playagainstate").on("value", function(snapshot) {
    var playagain = snapshot.numChildren();
    console.log(playagain);

    if (playagain === 1) {
      $("#winner").css("display", "none");
      $("#check1").css("visibility", "hidden");
      $("#check2").css("visibility", "hidden");
      $("#ready1").css("display", "none");
      $("#ready2").css("display", "none");

      console.log("This line is happening");
    }
    
  });

}