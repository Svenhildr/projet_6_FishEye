// import { contactForm } from "../utils/contactForm.js";
import photographerTemplate from "../templates/photographer.js";
import photoTemplate from "../templates/cardPhotographs.js";
//Mettre le code JavaScript lié à la page photographer.html
const url = new URL(window.location.href);
const photographerId = url.searchParams.get("id");
/* const photographerIdMap = {
    "Mimi Keel": 243,
    "Ellie-Rose Wilkens": 930,
    "Tracy Galindo": 82,
    "Nabeel Bradford": 527,
    "Rhode Dubois": 925,
    "Marcel Nikolic": 195,
}; */

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

        // const container = document.querySelector(".photograph-header");
        displayInfoPhotographer(selectedPhotographer);
        let photoContainer = document.querySelector(".photo_container");

        for (const media of mediasPhotographer) {
            const photoModel = photoTemplate(media);
            const photoCardDOM = photoModel.getPhotoCardDOM();
            photoContainer.appendChild(photoCardDOM);
        }
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

const select = document.getElementById("sort");
select
    .addEventListener("change", function () {
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

        // let headerContainer = `
        //     <div className="header_info">
        //         <h1 class="photographer_name">${selectedPhotographer.name} </h1>
        //         <span class="card_city">${selectedPhotographer.city}</span>
        //         <p class="card_quote">${selectedPhotographer.tagline}</p>
        //     </div>
        //     <button class="contact_button" onclick="openModal()">Contactez-moi</button>
        //     <img class="card_img" src="${picture}" alt = "portrait de ${selectedPhotographer.name}" >

        //     `;
        // container.innerHTML = headerContainer;

        // photographerTemplate(selectedPhotographer);

        // console.log(selectedPhotographer);
    })
    .catch((error) => {
        console.error(error);
    });
