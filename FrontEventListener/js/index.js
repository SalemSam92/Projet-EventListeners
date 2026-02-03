const eventwraper = document.getElementById("eventwraper");

// affichage des évènements tous les éléments ou avec un filtre ou sous forme de liste
async function fetchEvents(params = {}) {
  const url = new URL("http://localhost:3000/events");

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      url.searchParams.append(key, value);
    }
  });
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Erreur lors du chargement des évènements");
  }

  return res.json();
}

// Affichage de la liste au chargement de la page avec lien cliquable pour afficher le détail des évènements
async function display(params = {}) {
  const events = await fetchEvents(params);

  eventwraper.innerHTML = "";
  if (events.length === 0) {
    const li = document.createElement("li");
    li.textContent = "Aucun évènement ne correspond à votre recherche";
    eventwraper.appendChild(li);
    return;
  }

  events.forEach((event) => {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.href = `event.html?id=${event._id}`;
    link.textContent = event.titre;
    li.appendChild(link);
    eventwraper.appendChild(li);
  });
}

//Recherche par filtres
document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.getElementById("search-form");
  const resetBtn = document.getElementById("reset-search");

  if (!searchForm || !resetBtn) return;

  display();

  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const params = {
      titre: document.getElementById("search-titre").value.trim(),
      lieu: document.getElementById("search-lieu").value.trim(),
      date: document.getElementById("search-date").value,
    };

    display(params);
  });

  resetBtn.addEventListener("click", () => {
    searchForm.reset();
    display();
  });
});
