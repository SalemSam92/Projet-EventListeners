const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const userRole = sessionStorage.getItem("userRole")

let currentEvent = null;

document.addEventListener("DOMContentLoaded", () => {
  if (document.body.id !== "event-details") return;

  const editBtn = document.getElementById("edit-btn");
  const editForm = document.getElementById("edit-form");
  const cancelEdit = document.getElementById("cancel-edit");
  const deleteBtn = document.getElementById("delete-btn");

  async function EventDetail() {
    if (!id) {
      alert("Cet évènement n'existe pas.");
      return;
    }

    const res = await fetch(`http://localhost:3000/events/${id}`);
    if (!res.ok) {
      alert("Événement introuvable");
      return;
    }

    currentEvent = await res.json();

    document.getElementById("titre").textContent = currentEvent.titre;
    document.getElementById("description").textContent =
      currentEvent.description;
    document.getElementById("lieu").textContent = currentEvent.lieu;
    document.getElementById("date").textContent = new Date(
      currentEvent.date,
    ).toLocaleDateString("fr-FR");
    document.getElementById("nbPlace").textContent = currentEvent.nbPlace;
  }

  EventDetail();

  // affichage du formulaire modifier et mise à jour des champs
  editBtn.addEventListener("click", () => {
    if (!currentEvent) return;

    editForm.hidden = false;

    document.getElementById("edit-titre").value = currentEvent.titre;
    document.getElementById("edit-description").value =
      currentEvent.description;
    document.getElementById("edit-lieu").value = currentEvent.lieu;
    document.getElementById("edit-date").value = currentEvent.date.slice(0, 10);
    document.getElementById("edit-nbPlace").value = currentEvent.nbPlace;
  });

  //bouton annuler la modification
  cancelEdit.addEventListener("click", () => {
    editForm.hidden = true;
  });

  //modification
  editForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      titre: document.getElementById("edit-titre").value,
      description: document.getElementById("edit-description").value,
      lieu: document.getElementById("edit-lieu").value,
      date: document.getElementById("edit-date").value,
      nbPlace: Number(document.getElementById("edit-nbPlace").value),
    };

    const res = await fetch(`http://localhost:3000/events/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      alert("Erreur lors de la modification");
      return;
    }

    alert("Évènement modifié !");
    location.reload();
  });


  // Bouton supprimer
  deleteBtn.addEventListener("click", async () => {
    if (!confirm("Supprimer cet évènement ?")) return;

    const res = await fetch(`http://localhost:3000/events/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      alert("Erreur lors de la suppression");
      return;
    }

    
      window.location.href = "../html/adminView.html";
    
  });
});
