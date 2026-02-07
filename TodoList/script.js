class GestionnaireTaches {
  constructor() {
    this.taches = [];
  }

  ajouterTache(titre, priorite) {
    const nouvelleTache = {
      id: Date.now(),
      titre: titre,
      priorite: priorite,
      terminee: false,
      dateCreation: new Date().toLocaleDateString(),
    };

    this.taches = [...this.taches, nouvelleTache];
    console.log("tâche ajoutée :", nouvelleTache);
  }
}

const app = new GestionnaireTaches();

const form = document.getElementById("task-form");
const listElement = document.getElementById("task-list");

// pour mes stats, on regroupe les éléments dans un objet
const statsElement = {
  total: document.getElementById("total-tasks"),
  active: document.getElementById("active-tasks"),
  completed: document.getElementById("completed-tasks"),
};
console.log(statsElement.total);

// initialisation au changement de la page
// on attend que tout le html soit chargé avant de faire quoi que ce soit
document.addEventListener("DOMContentLoaded", () => {
  console.log("Application lancée!");
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const titre = document.getElementById("task-title").value.trim();
  const priorite = document.getElementById("task-priority").value;

  if (titre.trim()) {
    app.ajouterTache(titre, priorite);
  } else {
    alert("Veuillez entrer un titre de tâche valide.");
  }

  afficherTaches();

  form.reset(); // on réinitialise le formulaire après l'ajout
});

//fonction pour afficher les tâches
function afficherTaches() {
  listElement.innerHTML = ""; // on vide la liste avant de la remplir
  app.taches.forEach((tache) => {
    const li = document.createElement("li");
    li.innerHTML = `
        <div>
            <input type="checkbox" ${tache.terminee ? "checked" : ""} 
            onchange="toggleTache(${tache.id})"
            class="task-checkbox">
        </div>

        <div class="task-content">
          <div class="task-title">
              ${escapeHTML(tache.titre)}
          </div>
          <div class="task-meta">
              <span class="badge badge-${tache.priorite}">${escapeHTML(tache.priorite)}</span>
              <span>Créée le ${escapeHTML(tache.dateCreation)}</span>
          </div>
        </div>`;
    li.className = `task-item ${tache.terminee ? "completed" : ""}`;
    listElement.appendChild(li);
  });
}
//sécurité: on empêche l'injection de code malveillant
function escapeHTML(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}
