const messageWelcome = document.querySelector(".message-welcome")
const firstanme = sessionStorage.getItem("userFirstname")
const mail = sessionStorage.getItem("userMail")
const role = sessionStorage.getItem("userRole");


if (!mail) {
    window.location.href = "/html/login.html"
}

messageWelcome.textContent = `Bienvenue`+" " +firstanme + " Adresse mail : " + mail

// on verifie si on est admin

if (role === "admin") {

    // 1. ON recupere la liste d'évènemet

    fetch("http://localhost:3000/events")
    .then(res => res.json())
        .then(evenements => {
            const container = document.querySelector("#container-evenements")
            
            // 2. On boucle sur chaque événement pour créer son tableau
            evenements.forEach(event => {let html = "<h2> Événement : " + event.titre + "</h2>"
                html += "<table border='1' style='width:100%; margin-bottom:20px;'>"
                html += "<thead><tr><th>Nom</th><th>Prénom</th><th>Email</th></tr></thead>"
                html += "<tbody>"

                // 3. On boucle sur les participants de cet événement
                event.participants.forEach(user => {
                    html += "<tr>"
                    html += "<td>" + user.lastname + "</td>"
                    html += "<td>" + user.firstname + "</td>"
                    html += "<td>" + user.mail + "</td>"
                    html += "</tr>"
                })

                // Si le tableau est vide
                if (event.participants.length === 0) {
                    html += "<tr><td colspan='3'>Aucun inscrit</td></tr>"
                }

                html += "</tbody></table>"

                // 4. On ajoute tout ça dans la page
                container.innerHTML += html
            })
        })
}