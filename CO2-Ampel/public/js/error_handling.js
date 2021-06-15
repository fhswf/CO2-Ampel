
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