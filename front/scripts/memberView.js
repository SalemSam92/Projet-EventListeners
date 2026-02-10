const eventwraper = document.getElementById("eventwraper");
const userID = sessionStorage.getItem("userId")
const userRole = sessionStorage.getItem("userRole")
const myeventwraper = document.getElementById("myeventwraper");



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

async function register(id, updatedData) {
    const response = await fetch(`http://localhost:3000/events/register/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData)
    });
    return response.json();
}

async function unregister(id, updatedData) {
    const response = await fetch(`http://localhost:3000/events/unregister/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData)
    });
    return response.json();
}

async function displayAllEventList() {
    const data = await getEvents();

    for (const event of data) {
        const details = await getEventDetails(event._id);

        let eventDiv = document.createElement("div");
        eventDiv.id = event._id;

        let eventTitle = document.createElement("h3");
        eventTitle.textContent = event.titre;
        eventDiv.appendChild(eventTitle);

        let eventDesc = document.createElement("p");
        eventDesc.textContent = "Description : " + details.description
        eventDiv.appendChild(eventDesc);

        let eventLocation = document.createElement("p");
        eventLocation.textContent = "Lieu : " + details.lieu
        eventDiv.appendChild(eventLocation);

        let eventDate = document.createElement("p");
        eventDate.textContent = new Date(details.date).toLocaleDateString("fr-FR");
        eventDiv.appendChild(eventDate);

        let eventNbPlace = document.createElement("p");
        eventNbPlace.textContent = "Il reste " + details.nbPlace + " places disponibles"
        eventDiv.appendChild(eventNbPlace);

        if (!details.participants.includes(userID)) {
            if (details.nbPlace > 0) {
                let registerBTN = document.createElement("button")
                registerBTN.textContent = "S'inscrire"
                registerBTN.classList.add("btn-register")
                eventDiv.appendChild(registerBTN);

                //btn inscription listener
                registerBTN.addEventListener("click", async () => {

                    if (details.nbPlace > 0) {
                        const newData = {
                            userId: userID
                        };

                        // modification bdd
                        await register(eventDiv.id, newData);

                        // reload la page
                        window.location.reload();
                    }
                })
            }
        }
        else {
            let unregisterBTN = document.createElement("button")
            unregisterBTN.textContent = "Se désinscrire"
            unregisterBTN.classList.add("btn-unregister")
            eventDiv.appendChild(unregisterBTN);

            unregisterBTN.addEventListener("click", async () => {

                const newData = {
                    userId: userID,
                    requesterId: userID,
                    userRole: userRole
                };

                // modification bdd
                await unregister(eventDiv.id, newData);

                // reload la page
                window.location.reload();

            })
        }
        eventwraper.appendChild(eventDiv);
    }
}

async function displayMyEventList() {
    const data = await getEvents();

    for (const event of data) {
        const details = await getEventDetails(event._id);
        if (details.participants.includes(userID)) {
            let myeventDiv = document.createElement("div");
            myeventDiv.id = event._id;

            let myeventTitle = document.createElement("h3");
            myeventTitle.textContent = event.titre;
            myeventDiv.appendChild(myeventTitle);

            let myeventDesc = document.createElement("p");
            myeventDesc.textContent = "Description : " + details.description
            myeventDiv.appendChild(myeventDesc);

            let myeventLocation = document.createElement("p");
            myeventLocation.textContent = "Lieu : " + details.lieu
            myeventDiv.appendChild(myeventLocation);

            let myeventDate = document.createElement("p");
            myeventDate.textContent = new Date(details.date).toLocaleDateString("fr-FR");
            myeventDiv.appendChild(myeventDate);

            let myeventNbPlace = document.createElement("p");
            myeventNbPlace.textContent = "Il reste " + details.nbPlace + " places disponibles"
            myeventDiv.appendChild(myeventNbPlace);

            let unregisterBTN = document.createElement("button")
            unregisterBTN.textContent = "Se désinscrire"
            unregisterBTN.classList.add("btn-unregister")
            myeventDiv.appendChild(unregisterBTN);

            unregisterBTN.addEventListener("click", async () => {

                const newData = {
                    userId: userID,
                    requesterId: userID,
                    userRole: userRole
                };

                // modification bdd
                await unregister(myeventDiv.id, newData);

                // reload la page
                window.location.reload();
            })

                myeventwraper.appendChild(myeventDiv);
            }

       
    }
    }

    displayAllEventList();

    displayMyEventList();