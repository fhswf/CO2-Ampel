let interval = null;

/**
 * Adds a column to the data table.
 * @param value Value in column
 * @param parent Parent element
 */
function addColumn(value, parent){
	let el = document.createElement("td");
	el.textContent = value;
	parent.appendChild(el);
}

/**
 * Adds a row to the data table.
 * @param data Array containing data.
 * @param element Current dataset.
 * @param dataTable Data table element.
 */
function tableAddElement(data, element, dataTable){
    //Creates new Row
    let newEL = document.createElement("tr");
    //Creates Timestamp column and converts in UTCStrings
    addColumn(new Date(data[element].timestamp.toString()).toLocaleString(), newEL);
    //Creates Co2-Data and converts in UTCStrings
    addColumn(data[element].co2.toString(), newEL);
    //Creates Temperature-Data and converts in UTCStrings
    addColumn(data[element].temp.toString(), newEL);
    //Creates Humidity-Data and converts in UTCStrings
    addColumn(data[element].humidity.toString(), newEL);

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
        //No data found.
        renderNoDataFoundError();
    } else {
		//No Errors, Data found.
        removeErrors();
        for (let i = 0; i < data.length; i++) {
            tableAddElement(data, i, dataTable);
        }
    }
}

