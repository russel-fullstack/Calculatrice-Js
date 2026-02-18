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

  //Méthode pour basculer l'état d'une tâche (terminée ou non)
  toggleTache(id) {
    // On parcourt le tableau des tâches et on modifie celle qui correspond à l'ID
    this.taches = this.taches.map((tache) => {
      if (tache.id === id) {
        // On retourne une nouvelle tâche avec le champ "terminee" inversé
        //{ ...tache } crée une copie de l'objet tache, et ensuite on écrase le champ "terminee" avec sa valeur inversée
        return { ...tache, terminee: !tache.terminee };
      }
      return tache; //Sinon retour  les autres tâches  telles quelles
    });
  }

  supprimerTache(id) {
    this.taches = this.taches.filter((tache) => tache.id !== id);
  }

  // Obtenir les statistiques avec reduce()
  getStatistiques() {
    return this.taches.reduce(
      (stats, tache) => {
        // Pour chaque tâche...
        stats.total++; // On incrémente le total

        if (tache.terminee) {
          stats.terminees++;
        } else {
          stats.actives++;
        }

        return stats; // On retourne l'accumulateur pour la prochaine boucle
      },
      // Valeurs initiales de l'accumulateur
      { total: 0, actives: 0, terminees: 0 },
    );
  }

  // Filtrer selon critères
  filtrerTaches(filtre) {
    switch (filtre) {
      case "actives":
        return this.taches.filter((t) => !t.terminee);
      case "terminees":
        return this.taches.filter((t) => t.terminee);
      case "haute":
        return this.taches.filter((t) => t.priorite === "haute");
      default:
        // 'toutes' ou autre
        return this.taches;
    }
  }

  // Sauvegarder les tâches dans le localStorage
  sauvegarder() {
    try {
      localStorage.setItem("taches", JSON.stringify(this.taches));
      console.log("Tâches sauvegardées dans le localStorage");
    } catch (error) {
      console.error("Erreur lors de la sauvegarde :", error);
    }
  }

  // Charger les tâches depuis le localStorage
  charger() {
    try {
      const tachesSauvegardees = localStorage.getItem("taches");
      if (tachesSauvegardees) {
        this.taches = JSON.parse(tachesSauvegardees);
        console.log("Tâches chargées depuis le localStorage");
      }
    } catch (error) {
      console.error("Erreur lors du chargement :", error);
    }
  }
}
const app = new GestionnaireTaches();

let currentFilter = "toutes";

const form = document.getElementById("task-form");
const listElement = document.getElementById("task-list");
const boutonsFiltre = document.querySelectorAll(".filter-btn");

boutonsFiltre.forEach((button) => {
  button.addEventListener("click", (event) => {
    boutonsFiltre.forEach((bouton) => bouton.classList.remove("active"));

    event.target.classList.add("active");

    currentFilter = event.target.getAttribute("data-filter");

    afficherTaches();
  });
});

// pour mes stats, on regroupe les éléments dans un objet
const statsElements = {
  total: document.getElementById("total-tasks"),
  active: document.getElementById("active-tasks"),
  completed: document.getElementById("completed-tasks"),
};

// initialisation au changement de la page
// on attend que tout le html soit chargé avant de faire quoi que ce soit
document.addEventListener("DOMContentLoaded", () => {
  console.log("Application lancée!");
  app.charger(); // Charger les tâches sauvegardées
  afficherTaches(); // Afficher les tâches chargées
  majStats(); // Mettre à jour les statistiques
});

//fonctions globales
function supprimerTache(id) {
  app.supprimerTache(id);
  majStats();
  afficherTaches();
}

// Mise à jour des statistiques
function majStats() {
  const stats = app.getStatistiques();

  // On met à jour le texte des éléments <span>
  statsElements.total.textContent = stats.total;
  statsElements.active.textContent = stats.actives;
  statsElements.completed.textContent = stats.terminees;
}

//sécurité: on empêche l'injection de code malveillant
function escapeHTML(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

//fonction pour afficher les tâches
function afficherTaches() {
  listElement.innerHTML = ""; // on vide la liste avant de la remplir

  const tachesAffichees = app.filtrerTaches(currentFilter);

  // Petit bonus UX : Message si vide
  if (tachesAffichees.length === 0) {
    listElement.innerHTML =
      '<li style="text-align:center; color:#9ca3af; padding: 1rem;">Aucune tâche trouvée</li>';
    return;
  }

  tachesAffichees.forEach((tache) => {
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
          </div>
          <button class="btn-delete"  onclick="supprimerTache(${tache.id})" title="Supprimer">
          <!-- Icône poubelle SVG -->
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
          </svg>
          </button>`;
    li.className = `task-item ${tache.terminee ? "completed" : ""}`;
    listElement.appendChild(li);
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const titre = document.getElementById("task-title").value.trim();
  const priorite = document.getElementById("task-priority").value;

  if (titre.trim()) {
    app.ajouterTache(titre, priorite);
    app.sauvegarder(); // Sauvegarder après l'ajout
  } else {
    alert("Veuillez entrer un titre de tâche valide.");
  }

  majStats();
  afficherTaches();

  form.reset(); // on réinitialise le formulaire après l'ajout
});

window.supprimerTache = (id) => {
  if (confirm("Voulez-vous vraiment supprimer cette tâche ?")) {
    app.supprimerTache(id);
    app.sauvegarder(); // Sauvegarder après la suppression
    majStats();
    afficherTaches();
  }
};
// Fonctions globales pour les événements onclick dans le HTML

window.toggleTache = (id) => {
  app.toggleTache(id);
  app.sauvegarder(); // Sauvegarder après le toggle
  majStats();
  afficherTaches();
};
