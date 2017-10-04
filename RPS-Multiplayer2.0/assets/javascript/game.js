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

  // database.ref("variables").set({
  //   playerNumber: playerNumber
  // });

  var buttonNumber = parseInt($("#submit").attr("button-number"));
  console.log(parseInt(buttonNumber));

  if (buttonNumber === 1) {
  buttonNumber++;

  $("#playername").html(name);

  database.ref("/players/player1").set({
    name: name
  });

  database.ref("/variables").set({
    playerNumber: buttonNumber
  });
  }

  else {
    buttonNumber++

    $("#playername").html(name);
    
    database.ref("/players/player2").set({
      name: name
    });

    database.ref("variables").set({
      playerNumber: buttonNumber
    });
  }

  // if (buttonNumber === 3) {
  //   $("#topcard").html("Ok");
  // }

})




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