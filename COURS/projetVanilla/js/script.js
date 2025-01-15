import Personne from './Personne.js';
import Directeur from './Directeur.js';

// Bonne pratique : avoir une fonction appelée une fois
// que la page est prête, que le DOM est chargé, etc.
window.onload = init;

function init() {
    let btn = document.querySelector("#btnChangerTitre");
    btn.onclick = changerTitre

    console.log("Page chargée");

    let p = new Directeur("Buffa", "Michel", 59, "MIAGE");
    let b1 = document.querySelector("#btnAfficherPersonne");
    
    b1.onclick = () => {
        let div = document.querySelector("#personne");
        div.innerHTML = p.getDescription();
    }
}


function changerTitre() {
    // Query Selector API
    let titre = document.querySelector("#titre");

    // On utilise l'API du DOM pour changer le contenu
    titre.innerHTML = "<i>Nouveau titre</i>";
}