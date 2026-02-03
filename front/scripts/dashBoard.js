const messageWelcome = document.querySelector(".message-welcome")
const firstanme = sessionStorage.getItem("userFirstname")
const mail = sessionStorage.getItem("userMail")

if (!mail) {
    window.location.href = "/html/login.html"
}

messageWelcome.textContent = `Bienvenue`+" " +firstanme + " Adresse mail : " + mail