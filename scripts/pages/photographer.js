// Récupération de l'ID du photographe depuis l'URL
const url = new URL(window.location.href);
const photographerId = url.searchParams.get("id");

//Eléments du DOM
const dropdownIconDown = document.getElementById("dropdown-icon-down");
const dropdownIconUp = document.getElementById("dropdown-icon-up");
const selectBox = document.querySelector(".select_box");
const selectMenu = document.querySelector(".select_menu");
const firstMenuBtn = selectMenu.querySelector(".menu_btn");
const menuBtns = document.querySelectorAll(".menu_btn");
const firstIcon = firstMenuBtn.querySelector("i");
const sortBtn = document.querySelector(".menu_btn");
const likesContainer = document.querySelector(".likes_container");
const likeBtns = document.querySelectorAll(".like_btn");
let photoLikes = document.querySelector(".likes_media");

// Import des modules et des templates
import mediaCardTemplate from "../templates/cardPhotographs.js";
import photographerTemplate from "../templates/photographer.js";
import lightbox from "../utils/lightbox.js";
import sortMedia from "../templates/sortList.js";
import calculateTotalLikes from "../templates/Likes.js";

// Initialisation des variables
let mediasPhotographer;
let selectedPhotographer;
let photographers;
let photoContainer = document.querySelector(".photo_container");

// Récupération des données depuis le fichier JSON
try {
    const res = await fetch("data/photographers.json");
    const datas = await res.json();
    const { photographers, media } = datas;

    //Filtre pour récuperer le bon photogrpaheet les bons medias
    const selectedPhotographer = photographers.find((photographe) => photographe.id === parseInt(photographerId));

    // Récupere les media du photographe selectionné
    const mediasPhotographer = media.filter((media) => media.photographerId === parseInt(photographerId));

    // Affichage des infos photographe, des cards, des likes, du prix, tri des media

    displayInfoPhotographer(selectedPhotographer);
    sortMedia("Popularité", mediasPhotographer);
    displayCards(mediasPhotographer);
    displayLikeAdd({ photographers, media: mediasPhotographer });
    displayTotalAndPrice(selectedPhotographer, mediasPhotographer);

    //appel de la fonction lightbox en prenant en compte le filtre mediasPhotographer
    lightbox({ photographers, media: mediasPhotographer });
    filterBtns(mediasPhotographer, media, selectedPhotographer);
} catch (error) {
    console.log(error);
}

/**
 * Affiche les informations du photographe dans le formulaire de contact.
 *
 * @param {Object} selectedPhotographer - Les informations du photographe sélectionné.
 */
function displayInfoPhotographer(selectedPhotographer) {
    const titleForm = document.getElementById("formTitle");
    titleForm.textContent = `Contactez ${selectedPhotographer.name}`;

    const nameElt = document.getElementById("name");
    nameElt.textContent = selectedPhotographer.name;

    const cityElt = document.getElementById("city");
    cityElt.textContent = selectedPhotographer.city;

    const quoteElt = document.getElementById("quote");
    quoteElt.textContent = selectedPhotographer.tagline;

    const portraitElt = document.getElementById("portrait");
    const { picture } = photographerTemplate(selectedPhotographer);
    portraitElt.setAttribute("src", picture);
    portraitElt.setAttribute("alt", `portrait de ${selectedPhotographer.name}`);
}

let menuOpen = false;

/**
 * Gestionnaire d'événements pour l'ouverture du dropdown.
 */
selectBox.addEventListener("click", function () {
    selectBox.style.display = "none";
    selectMenu.style.display = "block";
    menuOpen = true;
    console.log("toto");
});

/**
 * Gestionnaire de navigation dropdown avec le clavier.
 */
selectBox.addEventListener("keydown", (event) => {
    selectBox.style.display = "none";
    selectMenu.style.display = "block";

    menuOpen = true;

    if (dropdownIconUp && event.key === "Escape") {
        menuClose();
    } else if (dropdownIconUp && event.key === "Enter") {
        filterBtns(medias, photographers, selectedPhotographer);
    }
});

/**
 * Gestionnaire d'événements pour la fermeture du dropdown.
 */
dropdownIconUp.addEventListener("click", function () {
    menuClose();
});

/**
 * Affiche les cartes des médias dans le conteneur photo.
 *
 * @param {Array} medias - Les médias à afficher sous forme de cartes.
 */
function displayCards(medias) {
    for (const media of medias) {
        const mediaCardObject = mediaCardTemplate(media);
        const cardContent = mediaCardObject.createCard();
        photoContainer.appendChild(cardContent);
    }
}

/**
 * Gère les événements de filtrage des médias en fonction des boutons du menu.
 *
 * @param {Array} medias - Les médias du photographe actuellement affichés.
 * @param {Array} photographers - Tous les photographes disponibles.
 * @param {Object} selectedPhotographer - Les informations du photographe sélectionné.
 */
function filterBtns(medias, photographers, selectedPhotographer) {
    menuBtns.forEach(function (btn) {
        btn.addEventListener("click", function () {
            const text = btn.textContent;
            selectBox.querySelector("span").textContent = text;
            photoContainer.innerHTML = "";
            const sortedMedia = sortMedia(text, medias);
            displayCards(sortedMedia);
            menuClose();
            lightbox({ photographers, media: sortedMedia });
            let totalLikes = calculateTotalLikes(selectedPhotographer.id, sortedMedia);
            updateTotal(totalLikes);
            displayLikeAdd({ photographers, media: sortedMedia });
        });
    });
}

/**
 * Affiche les likes des médias et gère les événements de like.
 *
 * @param {Object} photographers - Tous les photographes disponibles.
 * @param {Array} media - Les médias du photographe actuellement affichés.
 */
function displayLikeAdd({ photographers, media: mediasPhotographer }) {
    const likeBtns = document.querySelectorAll(".like_btn");
    let totalLikes = document.getElementById("total_likes");

    likeBtns.forEach(function (button) {
        /*         button.setAttribute("role", "button");
        button.setAttribute("tabindex", "4"); */

        button.addEventListener("click", function (event) {
            event.preventDefault();
            const parentContainer = button.closest(".Photo_likes");
            /*             if (!parentContainer) {
                console.error("Parent container not found.");
                return;
            } */
            //limite à 1 like par photo, si 2 clics, le like est retiré
            const selectedLike = parentContainer.querySelector(".likes_media");
            if (!selectedLike) {
                console.error("Element with class 'likes_media' not found.");
                return;
            }
            toggleLike(button, selectedLike, totalLikes);
        });

        button.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                const parentContainer = button.closest(".Photo_likes");
                //limite à 1 like par photo, si 2 clics, le like est retiré
                const selectedLike = parentContainer.querySelector(".likes_media");
                toggleLike(button, selectedLike, totalLikes);
            }
        });
    });
}

/**
 * Ferme le menu dropdown et rétablit l'affichage par défaut.
 */
function menuClose() {
    const selectBox = document.querySelector(".select_box");
    selectBox.style.display = "flex";
    selectMenu.style.display = "none";
    menuOpen = false;
}

/**
 * Affiche le nombre total de likes et le prix du photographe.
 *
 * @param {Object} selectedPhotographer - Les informations du photographe sélectionné.
 * @param {Array} mediasPhotographer - Les médias du photographe actuellement affichés.
 */
function displayTotalAndPrice(selectedPhotographer, mediasPhotographer) {
    let totalLikesElt = document.getElementById("total_likes");
    const pricePerDay = document.getElementById("price");

    let totalLikes = calculateTotalLikes(selectedPhotographer.id, mediasPhotographer);
    totalLikesElt.textContent = ` ${totalLikes} `;
    pricePerDay.innerHTML += `   ${selectedPhotographer.price}€ / jour`;

    const totalLikesContainer = document.createElement("div");
    totalLikesContainer.classList.add("Photo_likes");
    likesContainer.appendChild(totalLikesContainer);

    const heartIcon = document.createElement("i");
    heartIcon.classList.add("fa-sharp", "fa-solid", "fa-heart", "heart-full");

    totalLikesContainer.appendChild(totalLikesElt);
    totalLikesContainer.appendChild(heartIcon);
    likesContainer.appendChild(pricePerDay);
}

/**
 * Met à jour le nombre total de likes affiché.
 *
 * @param {number} totalLikes - Le nouveau nombre total de likes.
 */
function updateTotal(totalLikes) {
    let totalLikesElt = document.getElementById("total_likes");
    totalLikesElt.textContent = ` ${totalLikes} `;
}

/**
 * Gère l'interaction de "like" pour une photo.
 *
 * @param {HTMLElement} button - Le bouton "like" associé à la photo.
 * @param {HTMLElement} selectedLike - L'élément HTML contenant le nombre actuel de likes pour la photo.
 * @param {HTMLElement} totalLikes - L'élément HTML affichant le nombre total de likes pour le photographe.
 */
function toggleLike(button, selectedLike, totalLikes) {
    // let iconToUpdate = button.firstChild;

    /*     if (!button || !selectedLike || !totalLikes) {
        console.error("One of the elements is null");
        return;
    } */

    if (button.classList.contains("liked")) {
        button.classList.remove("liked");
        // iconToUpdate.classList.remove("fa-solid"); // On supprimer la classe (coeur plein)
        // iconToUpdate.classList.add("fa-regular");
        const likesValue = parseInt(selectedLike.textContent);
        const updatedLikesValue = likesValue - 1;
        selectedLike.textContent = updatedLikesValue;
        console.log(selectedLike.textContent);

        const totalLikeValue = parseInt(totalLikes.textContent);
        const updatedTotalLikes = totalLikeValue - 1;
        totalLikes.textContent = updatedTotalLikes;
    } else {
        button.classList.add("liked");
        // iconToUpdate.classList.remove("fa-regular"); // On supprimer la classe (coeur plein)
        // iconToUpdate.classList.add("fa-solid");
        const likesValue = parseInt(selectedLike.textContent);
        console.log(selectedLike.textContent);
        const updatedLikesValue = likesValue + 1;
        selectedLike.textContent = updatedLikesValue;

        const totalLikeValue = parseInt(totalLikes.textContent);
        const updatedTotalLikes = totalLikeValue + 1;
        totalLikes.textContent = updatedTotalLikes;
    }
}
