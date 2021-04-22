function getAvg(data){
    let sum = 0;

    for(let element in data){
        sum += data[element].co2;
    }

    return sum / data.length;
}

function changeTrafficLight(data){
    let avg = getAvg(data);
    let green = document.getElementById("green_light");
    let yellow = document.getElementById("yellow_light");
    let red = document.getElementById("red_light");

    green.classList.remove("enabled");
    yellow.classList.remove("enabled");
    red.classList.remove("enabled");

    if(avg < 1000){
        green.classList.add("enabled");
    }
    else if(avg < 2000){
        yellow.classList.add("enabled");
    }
    else {
        red.classList.add("enabled");
    }
}

function renderData(data){
    let dataTable = document.getElementById("dataTable");
    dataTable.innerHTML = "";

    for(let element in data){
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
}

function fetchData(){
    let params = {
        limit: document.getElementById('limit').value
    };

    if(document.getElementById("start_date").value !== "" && document.getElementById("start_time").value !== ""){
        params["start"] = document.getElementById("start_date").value + "T" + document.getElementById("start_time").value + "Z";
    } else if(document.getElementById("start_date").value !== ""){
        params["start"] = document.getElementById("start_date").value + "T00:00:00Z";
    }

    if(document.getElementById("end_date").value !== "" && document.getElementById("end_time").value !== ""){
        params["end"] = document.getElementById("end_date").value + "T" + document.getElementById("end_time").value + "Z";
    } else if(document.getElementById("end_date").value !== ""){
        params["end"] = document.getElementById("end_date").value + "T23:59:59Z";
    }

    fetch("/api/data?" + new URLSearchParams(params)).then((data) => {
        return data.json();
    }).then((data) => {
        console.log(data);
        renderData(data);
        changeTrafficLight(data);
    });
}

window.onload = function() {
    fetchData();
}