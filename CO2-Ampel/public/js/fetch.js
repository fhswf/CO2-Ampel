/**
 * Clears the Fetch.
 */
function clearFetch() {
    if (interval !== null) {
        clearInterval(interval);
    }
}

/**
 * Empties the table and clears the fetch.
 */
function hideTable() {
    clearFetch();
    document.getElementById("device_not_found").classList.add("hidden");
    document.getElementById("data_not_found").classList.add("hidden");
    document.getElementById("data_table").classList.add("hidden");
}
/**
 * Preprocessing the Start Data
 */
function preProcessStartData(params) {
    //Concats start date and time together.
    if (document.getElementById("start_date").value !== "" && document.getElementById("start_time").value !== "") {
        params["start"] = document.getElementById("start_date").value + "T" + document.getElementById("start_time").value + "Z";
    }
    //No start time given. Use 00:00:00.
    else if (document.getElementById("start_date").value !== "") {
        params["start"] = document.getElementById("start_date").value + "T00:00:00Z";
    }
}
/**
 * Preprocessing the End Data
 */
function preProcessEndData(params){
	// Concats the end date and time together.
    if (document.getElementById("end_date").value !== "" && document.getElementById("end_time").value !== "") {
        params["end"] = document.getElementById("end_date").value + "T" + document.getElementById("end_time").value + "Z";
    }
    // No end time given. Use 23:59:59.
    else if (document.getElementById("end_date").value !== "") {
        params["end"] = document.getElementById("end_date").value + "T23:59:59Z";
    }
}
/**
 * Fetches the data depending on the given arguments in the timestamp form.
 */
function fetchData() {
    let params = {
        limit: document.getElementById('limit').value
    };
	
	preProcessStartData(params);  
	preProcessEndData(params);

    if (document.getElementById("host_name").value !== "") {
        params["host"] = document.getElementById("host_name").value;
    }

    fetch("./api/data?" + new URLSearchParams(params)).then((data) => {
        return data.json();
    }).then((data) => {
        renderData(data);
        changeTrafficLight(data);
        clearFetch();
        interval = setInterval(fetchData, 5000);
    }).catch((err) => {
        console.log(err);
        renderNoDataFoundError();
    });
}