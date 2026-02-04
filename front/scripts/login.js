const form = document.querySelector("#form")

form.addEventListener("submit", async (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    await login(data.get("mail"), data.get("password"))
})

async function login(mail, password) {
    const res = await fetch(`http://localhost:3000/login`, {
        method: "POST",
        body: JSON.stringify({ mail, password }),
        headers: {
            'content-type': "application/json"

        }
    })

    const data = await res.json()
    
    if (data.ok) {
        sessionStorage.setItem("userId", data.id)
        sessionStorage.setItem("userFirstname", data.firstname)
        sessionStorage.setItem("userMail",data.mail)
      //  window.location.href = "/html/dashBoard.html"
        window.location.href = "/FrontEventListener/index.html"
    } else {
      alert("Adresse e-mail ou mot de passe incorrect")

    }

}