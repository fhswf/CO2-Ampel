/**
 * Changes the traffic light depending on the given data.
 * Green: <1000ppm
 * Yellow: <2000ppm
 * Red: >2000pm
 * @param data C02 Data for changing the traffic lights.
 */
function changeTrafficLight(data) {
	//Get Data of the Table for the lights
	let lastElement = data[0].co2;

	turnOffLights();

	//Trafficlight Green
    if (lastElement < 1000) {
		turnGreen();
    }
	//Trafficlight Yellow
    else if (lastElement < 2000) {
        turnYellow();
    }
	//Trafficlight Red
    else {
		turnRed();
    }
}

//Turns off all the lights
function turnOffLights(){
	let green = document.getElementById("green_light");
	let yellow = document.getElementById("yellow_light");
	let red = document.getElementById("red_light");

	//Every light enabled is removed -> Disabled
	green.classList.remove("enabled");
	yellow.classList.remove("enabled");
	red.classList.remove("enabled");
}

//Enables the green color in the trafficlight
function turnGreen(){
	let green = document.getElementById("green_light");
	green.classList.add("enabled");
}

//Enables the yellow color in the trafficlight
function turnYellow(){
	let yellow = document.getElementById("yellow_light");
	yellow.classList.add("enabled");
}

//Enables the yellow color in the trafficlight
function turnRed(){
	let red = document.getElementById("red_light");
	red.classList.add("enabled");
}

