const url = new URL(window.location.href);
const photographerId = url.searchParams.get("id");
const dropdownIconDown = document.getElementById("dropdown-icon-down");
const dropdownIconUp = document.getElementById("dropdown-icon-up");
const selectBox = document.querySelector(".select_box");
const selectMenu = document.querySelector(".select_menu");
const firstMenuBtn = selectMenu.querySelector(".menu_btn");
const menuBtns = document.querySelectorAll(".menu_btn");
const firstIcon = firstMenuBtn.querySelector("i");
const sortBtn = document.querySelector(".menu_btn");

import mediaCardTemplate from "../templates/cardPhotographs.js";
import photographerTemplate from "../templates/photographer.js";
import lightbox from "../utils/lightbox.js";
import sortMedia from "../templates/sortList.js";

let mediasPhotographer;
let photoContainer = document.querySelector(".photo_container");

try {
    const res = await fetch("data/photographers.json");
    const datas = await res.json();
    const { photographers, media } = datas;

    //Filtre pour récuperer le bon photogrpaheet les bons medias
    const selectedPhotographer = photographers.find((photographe) => photographe.id === parseInt(photographerId));

    // Récupere les media du photographe selectionné
    const mediasPhotographer = media.filter((media) => media.photographerId === parseInt(photographerId));

    let selectElt = document.querySelector(".select_content");
    displayInfoPhotographer(selectedPhotographer);
    // console.log(mediasPhotographer);
    //boucle de création des cartes média
    for (const media of mediasPhotographer) {
        const mediaCardObject = mediaCardTemplate(media);
        const cardContent = mediaCardObject.createCard();
        photoContainer.appendChild(cardContent);
    }
    //appel de la fonction lightbox en prenant en compte le filtre mediasPhotographer
    lightbox({ photographers, media: mediasPhotographer });
    filterBtns(mediasPhotographer);
} catch (error) {
    console.log(error);
}
// console.log(mediasPhotographer);

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

// document.addEventListener("DOMContentLoaded", function () {
let menuOpen = false;

// Gestionnaire d'événement pour le chevron vers le bas
dropdownIconDown.addEventListener("click", function () {
    selectBox.style.display = "none";
    selectMenu.style.display = "block";
    menuOpen = true;
});

dropdownIconUp.addEventListener("click", function () {
    menuClose();
});

// event boutons du menu
function filterBtns(medias) {
    menuBtns.forEach(function (btn) {
        btn.addEventListener("click", function () {
            const text = btn.textContent;
            selectBox.querySelector("span").textContent = text;
            // console.log(selectBox.querySelector("span"), text);
            // console.log(medias);

            removeAllChildNodes(photoContainer);
            // console.log(medias);
            const sortedMedia = sortMedia(text, medias);
            for (const media of sortedMedia) {
                const mediaCardObject = mediaCardTemplate(media);
                const cardContent = mediaCardObject.createCard();
                photoContainer.appendChild(cardContent);
            }
            menuClose();
        });
    });
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function menuClose() {
    const selectBox = document.querySelector(".select_box");
    selectBox.style.display = "flex";
    selectMenu.style.display = "none";
    menuOpen = false;
}
