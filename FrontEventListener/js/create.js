//Création d'évènement
const createForm = document.getElementById("create-form");

createForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const data = {
    titre: document.getElementById("titre").value,
    description: document.getElementById("description").value,
    lieu: document.getElementById("lieu").value,
    date: document.getElementById("date").value, // YYYY-MM-DD
    nbPlace: Number(document.getElementById("nbPlace").value),
  };

  try {
    const res = await fetch("http://localhost:3000/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error("Erreur lors de la création");
    }

    console.log("Évènement créé :", result);
    createForm.reset();
    display();
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
});
