import photographerTemplate from "../templates/photographer.js";

fetch("data/photographers.json")
    .then((response) => {
        return response.json();
    })
    .then((datas) => {
        // Extraction des photographes du jeu de données
        const { photographers } = datas;
        // Appel de la fonction pour afficher les cartes des photographes
        displayData(photographers);
    });

/**
 * Affiche les cartes des photographes sur la page.
 *
 * @param {Array} photographers - La liste des photographes à afficher.
 */
function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}
