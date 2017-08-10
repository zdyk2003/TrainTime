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
	var firstTrain = moment($("#firstTrain-input").val().trim(), "HH:mm").subtract(10, "years").format("X");
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
//** I can not get these 2 variables to show up in firebase?
	// var minutesAway = snapshot.val().minutesAway;
	// var nextArrival = snapshot.val().nextArrival;

	//train info
	console.log("First Train: " + trFirst);
	// Current Time
	var currentTime = moment();
	console.log("The time is: " + moment().format("HH:mm A"));
	//minutes away
	var remainder = moment().diff(moment.unix(trFirst), "minutes") % trFrequency;
	console.log("remainder is " + remainder);
	var minutesAway = trFrequency - remainder;
	console.log("minutes away " + minutesAway);
	// next arrival time
	var nextArrival = moment().add(minutesAway, "m").format("hh:mm A");
	console.log("Next train " + nextArrival);

	//fill in the table
	$("#trainData").append('<tr><td>' + trName + '</td><td>' + trDestination + '</td><td>' + trFrequency + '</td><td>' + nextArrival + '</td><td>' + minutesAway + '</td></tr>');

});

