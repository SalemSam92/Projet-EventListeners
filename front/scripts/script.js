const form = document.querySelector("#form")


form.addEventListener("submit",async (e)=>{
    e.preventDefault()
    const data = new FormData(e.target)
    await registerUser(data.get("lastname"),data.get("firstname"),data.get("mail"),data.get("password"))
})

async function registerUser(lastname,firstname,mail,password){
    const res = await fetch("http://localhost:3000/inscription",{
        method : "POST",
        body : JSON.stringify({lastname,firstname,mail,password}),
        headers : {
            'content-type' : "application/json"
        },
     
    })
     
 window.location.href = "/html/login.html"
      return res
}
