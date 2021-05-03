let interval = null;

/**
 * Returns the average of the given Data.
 * @param data Data to calculate average of.
 * @returns {number} Average of the Data.
 */
function getAvg(data) {
    let sum = 0;

    for (let element in data) {
        sum += data[element].co2;
    }

    return sum / data.length;
}

/**
 * Changes the traffic light depending on the given data.
 * Green: <1000ppm
 * Yellow: <2000ppm
 * Red: >2000pm
 * @param data C02 Data for changing the traffic lights.
 */
function changeTrafficLight(data) {
    let avg = getAvg(data);
    let green = document.getElementById("green_light");
    let yellow = document.getElementById("yellow_light");
    let red = document.getElementById("red_light");

    green.classList.remove("enabled");
    yellow.classList.remove("enabled");
    red.classList.remove("enabled");

    if (avg < 1000) {
        green.classList.add("enabled");
    }
    else if (avg < 2000) {
        yellow.classList.add("enabled");
    }
    else {
        red.classList.add("enabled");
    }
}

/**
 * Renders a error if no data is found.
 */
function renderNoDataFoundError() {
    document.getElementById("data_not_found").classList.remove("hidden");
    document.getElementById("data_table").classList.add("hidden");
    document.getElementById("device_not_found").classList.add("hidden");
}

/**
 * Removes all possible errors.
 */
function removeErrors(){
    document.getElementById("data_not_found").classList.add("hidden");
    document.getElementById("device_not_found").classList.add("hidden");
    document.getElementById("data_table").classList.remove("hidden");
}

/**
 * Adds a row to the data table.
 * @param data Array containing data.
 * @param element Current dataset.
 * @param dataTable Data table element.
 */
function tableAddElement(data, element, dataTable){
    let newEL = document.createElement("tr");
    let timestamp = document.createElement("td");
    let co2 = document.createElement("td");
    let temp = document.createElement("td");
    let humidity = document.createElement("td");

    timestamp.textContent = new Date(data[element].timestamp).toUTCString();
    co2.textContent = data[element].co2.toString();
    temp.textContent = data[element].temp.toString();
    humidity.textContent = data[element].humidity.toString();

    newEL.appendChild(timestamp);
    newEL.appendChild(co2);
    newEL.appendChild(temp);
    newEL.appendChild(humidity);
    dataTable.appendChild(newEL);
}

/**
 * Renders the Data of a unit given into the main table.
 * @param data Data of a unit containing timestamps, co2 ppm, humidity and temperature.
 */
function renderData(data) {
    let dataTable = document.getElementById("dataTable");
    dataTable.innerHTML = "";

    if (data.length === 0) {
        // No data found.
        renderNoDataFoundError();
    } else {
        removeErrors();

        for (let element in data) {
            tableAddElement(data, element, dataTable);
        }
    }
}

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
 * Fetches the data depending on the given arguments in the timestamp form.
 */
function fetchData() {
    let params = {
        limit: document.getElementById('limit').value
    };

    // Concats the start date and time together.
    if (document.getElementById("start_date").value !== "" && document.getElementById("start_time").value !== "") {
        params["start"] = document.getElementById("start_date").value + "T" + document.getElementById("start_time").value + "Z";
    }
    // No start time given. Use 00:00:00.
    else if (document.getElementById("start_date").value !== "") {
        params["start"] = document.getElementById("start_date").value + "T00:00:00Z";
    }

    // Concats the end date and time together.
    if (document.getElementById("end_date").value !== "" && document.getElementById("end_time").value !== "") {
        params["end"] = document.getElementById("end_date").value + "T" + document.getElementById("end_time").value + "Z";
    }
    // No end time given. Use 23:59:59.
    else if (document.getElementById("end_date").value !== "") {
        params["end"] = document.getElementById("end_date").value + "T23:59:59Z";
    }

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
        renderNoDataFoundError();
    });
}