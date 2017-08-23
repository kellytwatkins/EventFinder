
  //Initialize firebase
  var config = {
    apiKey: "AIzaSyBhXlVx_h3lQufs0t13aevXF7wF8jBa_x0",
    authDomain: "eventfinder-87f63.firebaseapp.com",
    databaseURL: "https://eventfinder-87f63.firebaseio.com",
    projectId: "eventfinder-87f63",
    storageBucket: "eventfinder-87f63.appspot.com",
    messagingSenderId: "508334366029"
  };

  firebase.initializeApp(config);

  //Create a variable to reference the database
  var dataRef = firebase.database();

//Add id for submit button.
	$("#submit").on("click", function(event) {
	  	event.preventDefault();

	  	//var validZip = true;
	  	var zipLength = zipCode.length;
	  	var radiusLength = radi.length;
	  	if ((zipLength === 5) && (radiusLength !== 0)) {
	  		$("#alert").empty();
	  		console.log("Valid zip code: " + zipCode);
            sqoot(function () {
                dataRef.ref().push(userSearch);
            });
            
	  		//Clear text input values
	  		  	$("#city-input").val("");
	  		  	$("#state-input").val("");
	  		  	$("#zip-input").val("");
	  		  	$("#radius").val("");
	  		return true;
	  	}
	  	//If zip code is not 5 characters, remove value from the table/ alert user zip code is not valid.
	  	else{
	  		event.preventDefault();
	  		$("#alert").html("* PLEASE ENTER A VALID ZIP CODE AND RADIUS.");
	  		//Clear text input values
	  		  	$("#city-input").val("");
	  		  	$("#state-input").val("");
	  		  	$("#zip-input").val("");
	  		  	$("#radius").val("");
	  		return false;
	  	}	
 
	});//submit button function

	dataRef.ref().on("child_added", function(childSnapshot, prevChildKey) {

	city = childSnapshot.val().city;
	state = childSnapshot.val().state;
	zipCode = childSnapshot.val().zipCode;
	radius = childSnapshot.val().radius;

	//Clear local storage
	localStorage.clear();


	//Sets local storage to the last value entered by the user.
	localStorage.setItem("city", city);
	localStorage.setItem("state", state);
	localStorage.setItem("zipCode", zipCode);
	localStorage.setItem("radius", radius);
	
	//Append user input data to the recent searches table.
	$("#recentTable > tbody").prepend("<tr><td class='cityData'>" + city + "</td><td class='stateData'>" + state + "</td><td class='zipData'>" + zipCode + "</td><td class='radiusData'>" + radius + "</td></tr>");

	});


	  	//Regular expression checking city input for invalid characters.
	  	function checkCity(input) {
	  		var regex = /[^a-z ]/gi;
                input.value = input.value.replace(regex, "");

	  	}

	  	//Regular expression checking state input for invalid characters.
	  	function checkState(input) {
		  	regex = /[^a-z ]/gi;
		  	input.value = input.value.replace(regex, "");
	  	}

	  	//Regex checking zip for illegal characters.
	 	function checkZip(input) {
		  	regex = /[^0-9]/g;
		  	input.value = input.value.replace(regex, "");
	  	}	  	

	  	//Regex checking radius for illegal characters.
	  	function checkRadius (input) {
	  		regex = /[^0-9]/g;
	  		input.value = input.value.replace(regex, "");
	  	}	 


