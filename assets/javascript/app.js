// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAwv6gxCoyMigCcZs9usr5qpnA4SaqFMyo",
    authDomain: "traintime-cb4ac.firebaseapp.com",
    databaseURL: "https://traintime-cb4ac.firebaseio.com",
    projectId: "traintime-cb4ac",
    storageBucket: "",
    messagingSenderId: "428948045417"
  };
  
  firebase.initializeApp(config);

  var database = firebase.database();

  // submit button
  $("#submit").on("click", function () {
	event.preventDefault();

	var trainName = $("#trainName-input").val();
	var destination = $("#destination-input").val().trim();
	var firstTrain = $("#firstTrain-input").val().trim();
	var frequency = $("#frequency-input").val().trim();
	

//push submit data to firebase
 	var newTrain = {
 		trainName: trainName,
 		destination: destination,
 		firstTrain: firstTrain,
 		frequency: frequency,
 		// nextTr: nextTr,
 		// minutesA: minutesA
 	}
 	
 	database.ref().push(newTrain);

 	//clear the text boxes
 	$("#trainName-input").val("");
 	$("#destination-input").val("");
 	$("#firstTrain-input").val("");
 	$("#frequency-input").val("");
 });

database.ref().on("child_added", function(snapshot) {

	var trName = snapshot.val().trainName;
	console.log(trName);
	var trDestination = snapshot.val().destination;
	var trFirst = snapshot.val().firstTrain;
	var trFrequency = snapshot.val().frequency;
	console.log("Frequency " + trFrequency);
//** I can not get these 2 variables to show up in firebase?
	// var minutesAway = snapshot.val().minutesAway;
	// var nextArrival = snapshot.val().nextArrival;

	//train info
	console.log("First Train: " + trFirst);
	// Current Time
	var currentTime = moment();
	console.log("The time is: " + moment().format("HH:mm A"));
	//minutes away
	var minutesAway = moment().diff(trFirst, "HH:mm A") % trFrequency;
	console.log("minutesAway " + minutesAway);
	// next arrival time
	var nextArrival = moment().add(minutesAway, "minutes").format("HH:mm A");
	console.log("Next train " + nextArrival);

	//fill in the table
	$("#trainData").append('<tr><td>' + trName + '</td><td>' + trDestination + '</td><td>' + trFrequency + '</td><td>' + nextArrival + '</td><td>' + minutesAway + '</td></tr>');

});

