//Mettre le code JavaScript lié à la page photographer.html
const url = new URL(window.location.href);
const photographerId = url.searchParams.get("id");

import photographerTemplate from "../templates/photographer.js";
import MediaCard from "../templates/cardPhotographs.js";
// console.log(photographerId);

fetch("data/photographers.json")
    .then((response) => {
        if (!response.ok) {
            throw new Error("Erreur lors du chargement du fichier JSON.");
        }
        return response.json();
    })
    .then((datas) => {
        const { photographers, media } = datas;
        //Filtrer photogrpahe opour récupere le bon et les mbon medias
        const selectedPhotographer = photographers.find((photographe) => photographe.id === parseInt(photographerId));

        // Récupere les media du phtogphrase selectionnner
        const mediasPhotographer = media.filter((media) => media.photographerId === parseInt(photographerId));

        let selectElt = document.querySelector(".select_content");
        /*         let selectElt = document.createElement("div");
        selectElt.classList.add("sort");
        selectElt.textContent = "trier par "; 
        sortContainer.appendChild(sortElt);*/

        let popularityOption = document.createElement("button");
        popularityOption.classList.add("popularity_option");
        popularityOption.textContent = "Popularité";
        selectElt.appendChild(popularityOption);

        let DateOption = document.createElement("div");
        DateOption.classList.add("date_option");
        DateOption.textContent = "Date";
        selectElt.appendChild(DateOption);

        let titleOption = document.createElement("div");
        titleOption.classList.add("title_option");
        titleOption.textContent = "Titre";
        selectElt.appendChild(titleOption);

        // const container = document.querySelector(".photograph-header");
        displayInfoPhotographer(selectedPhotographer);
        let photoContainer = document.querySelector(".photo_container");

        /*   for (const media of mediasPhotographer) {
            const photoModel = photoTemplate(media);
            const photoCardDOM = photoModel.getPhotoCardDOM();
            photoContainer.appendChild(photoCardDOM);
        } */

        //boucle de création des cartes média
        for (const media of mediasPhotographer) {
            const { photographerId, title, likes, video, image } = media;
            const mediaCard = new MediaCard(photographerId, title, likes, video, image);
            const cardContent = mediaCard.createCard();
            photoContainer.appendChild(cardContent);
        }

        //faire une boucle pour l'affichage des différents tris, après
        //avoir créé les différentes div de choix
        //if eventlistener sur date -> tri par le plus récent
        //else if eventlistener sur titre -> tri par ordre alphabetique
        // else if par défaut sur popularité.

        /*         for (const media of mediasPhotographer) {
            const mediaCard = mediaFactory(media);
            let mediaCardDOM;
            if (media.video) {
                mediaCardDOM = mediaCard.createVideoCard();
            } else {
                mediaCardDOM = mediaCard.createImageCard();
            }
            photoContainer.appendChild(mediaCardDOM);
        } */
    })
    .catch((error) => {
        console.error(error, "catch");
    });

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
