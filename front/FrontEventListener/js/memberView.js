const eventwraper = document.getElementById("eventwraper");



async function getEvents() {
    const response = await fetch("http://localhost:3000/events", {
        method: "GET", // POST, PUT, PATCH, DELETE
        headers: {
            'Content-type': "application/json"
        }
    });
    const data = await response.json();
    return data;
}

async function getEventDetails(id) {
    const response = await fetch(`http://localhost:3000/events/${id}`, {
        method: "GET", // POST, PUT, PATCH, DELETE
        headers: {
            'Content-type': "application/json"
        }
    });
    const data = await response.json();
    return data;
}

async function displayList(){
    const data = await getEvents()

    data.forEach((event) => {
        let eventDiv = document.createElement("div")
        eventDiv.id = event._id;

        let eventTitle = document.createElement("h3")
        eventTitle.textContent = event.titre


        eventDiv.appendChild(eventTitle);

        eventwraper.appendChild(eventDiv);})
}

displayList();