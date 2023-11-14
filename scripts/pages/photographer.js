const url = new URL(window.location.href);
const photographerId = url.searchParams.get("id");
const dropdownIconDown = document.getElementById("dropdown-icon-down");
const dropdownIconUp = document.getElementById("dropdown-icon-up");
const selectBox = document.querySelector(".select_box");
const selectMenu = document.querySelector(".select_menu");
const firstMenuBtn = selectMenu.querySelector(".menu_btn");
const menuBtns = document.querySelectorAll(".menu_btn");
const firstIcon = firstMenuBtn.querySelector("i");

import mediaCardTemplate from "../templates/cardPhotographs.js";
import photographerTemplate from "../templates/photographer.js";
import lightbox from "../utils/lightbox.js";

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
    let photoContainer = document.querySelector(".photo_container");

    //boucle de création des cartes média
    for (const media of mediasPhotographer) {
        const mediaCardObject = mediaCardTemplate(media);
        const cardContent = mediaCardObject.createCard();
        photoContainer.appendChild(cardContent);
    }

    lightbox(datas);
    console.log("Datas:", datas);
} catch (error) {
    console.log(error);
}

/* await fetch("data/photographers.json")

    .then((response) => {
        if (!response.ok) {
            throw new Error("Erreur lors du chargement du fichier JSON.");
        }
        return response.json();
    })
    .then((datas) => {
        const { photographers, media } = datas;
        //Filtre pour récuperer le bon photogrpaheet les bons medias
        const selectedPhotographer = photographers.find((photographe) => photographe.id === parseInt(photographerId));

        // Récupere les media du photographe selectionné
        const mediasPhotographer = media.filter((media) => media.photographerId === parseInt(photographerId));

        let selectElt = document.querySelector(".select_content");
        displayInfoPhotographer(selectedPhotographer);
        let photoContainer = document.querySelector(".photo_container");

        //boucle de création des cartes média
        for (const media of mediasPhotographer) {
            const mediaCardObject = mediaCardTemplate(media);
            const cardContent = mediaCardObject.createCard();
            photoContainer.appendChild(cardContent);
        }
    })
    .catch((error) => {
        console.error(error, "catch");
    }); */

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
console.log(menuBtns);
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
menuBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
        const text = btn.textContent;
        selectBox.querySelector("span").textContent = text;
        console.log(selectBox.querySelector("span"), text);
        menuClose();
    });
});
// });

function menuClose() {
    const selectBox = document.querySelector(".select_box");
    selectBox.style.display = "flex";
    selectMenu.style.display = "none";
    menuOpen = false;
}

/* const select = document.getElementById("sort");
select.addEventListener("change", function () {
    const selectIndex = select.selectedIndex;

    if (selectIndex >= 0) {
        const selectOption = select.options[selectIndex];
        const selectedValue = selectOption.value;
        console.log(selectIndex);
        console.log(selectedValue);
        if (selectIndex === 0) {
            return console.log("c'est les likes");
        } else if (selectIndex === 1) {
            return console.log("c'est la date");
        } else if (selectIndex === 2) {
            return console.log("c'est le titre");
        } else {
            console.log("ça marche pô boudiou");
        }
    }
}); */
