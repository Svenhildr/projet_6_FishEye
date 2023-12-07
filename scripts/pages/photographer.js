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
const likesContainer = document.querySelector(".likes_container");
const likeBtns = document.querySelectorAll(".like_btn");
// console.log("Nombre de boutons de like :", likeBtns.length);
let photoLikes = document.querySelector(".likes_media");

import mediaCardTemplate from "../templates/cardPhotographs.js";
import photographerTemplate from "../templates/photographer.js";
import lightbox from "../utils/lightbox.js";
import sortMedia from "../templates/sortList.js";
import calculateTotalLikes from "../templates/Likes.js";

let mediasPhotographer;
let photographers;
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
    //boucle de création des cartes média
    sortMedia("Popularité", mediasPhotographer);
    displayCards(mediasPhotographer);
    displayLikeAdd({ photographers, media: mediasPhotographer });

    displayTotalAndPrice(selectedPhotographer, mediasPhotographer);
    //appel de la fonction lightbox en prenant en compte le filtre mediasPhotographer
    lightbox({ photographers, media: mediasPhotographer });
    filterBtns(mediasPhotographer, media);
    // displayLikeAdd({ photographers, media: mediasPhotographer });
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

function displayCards(medias) {
    for (const media of medias) {
        const mediaCardObject = mediaCardTemplate(media);
        const cardContent = mediaCardObject.createCard();
        photoContainer.appendChild(cardContent);
    }
}

// event boutons du menu
function filterBtns(medias, photographers) {
    menuBtns.forEach(function (btn) {
        btn.addEventListener("click", function () {
            const text = btn.textContent;
            selectBox.querySelector("span").textContent = text;
            photoContainer.innerHTML = "";
            const sortedMedia = sortMedia(text, medias);
            displayCards(sortedMedia);
            menuClose();
            lightbox({ photographers, media: sortedMedia });
            calculateTotalLikes(photographers.id, medias);
        });
    });
}

function displayLikeAdd({ photographers, media: mediasPhotographer }) {
    const likeBtns = document.querySelectorAll(".like_btn");
    let totalLikes = document.getElementById("total_likes");
    // const photoLikes = document.querySelector(".likes_media");
    // console.log(photoLikes);

    likeBtns.forEach(function (button) {
        button.addEventListener("click", function (event) {
            event.preventDefault();

            //limite a 1 like par photo si 2 clicks le like est retiré
            let selectedLike = event.target.closest("div").querySelector("span");
            // console.log(event.target.closest("div").querySelector("span"));

            if (button.classList.contains("liked")) {
                console.log("c'est retiré");
                button.classList.remove("liked");
                const likesValue = parseInt(selectedLike.textContent);
                const updatedLikesValue = likesValue - 1;
                selectedLike.textContent = ` ${updatedLikesValue} `;

                const totalLikeValue = parseInt(totalLikes.textContent);
                const updatedTotalLikes = totalLikeValue - 1;
                totalLikes.textContent = ` ${updatedTotalLikes} `;
            } else {
                console.log("c'est ajouté");
                button.classList.add("liked");
                const likesValue = parseInt(selectedLike.textContent);
                const updatedLikesValue = likesValue + 1;
                selectedLike.textContent = ` ${updatedLikesValue}  `;

                const totalLikeValue = parseInt(totalLikes.textContent);
                const updatedTotalLikes = totalLikeValue + 1;
                totalLikes.textContent = ` ${updatedTotalLikes} `;
            }
        });
    });
}

function menuClose() {
    const selectBox = document.querySelector(".select_box");
    selectBox.style.display = "flex";
    selectMenu.style.display = "none";
    menuOpen = false;
}

function displayTotalAndPrice(selectedPhotographer, mediasPhotographer) {
    const totalLikesElt = document.getElementById("total_likes");
    const pricePerDay = document.getElementById("price");
    const totalLikes = calculateTotalLikes(selectedPhotographer.id, mediasPhotographer);
    totalLikesElt.textContent = ` ${totalLikes}  `;
    totalLikesElt.innerHTML += ' <i class="fa-sharp fa-solid fa-heart heart-full"></i>';
    pricePerDay.innerHTML += `   ${selectedPhotographer.price}€ / jour`;
    likesContainer.appendChild(totalLikesElt);
    likesContainer.appendChild(pricePerDay);
}
