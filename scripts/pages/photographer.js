import { contactForm } from "../utils/contactForm.js";
import photographerTemplate from "../templates/photographer.js";

//Mettre le code JavaScript lié à la page photographer.html
const url = new URL(window.location.href);
const photographerId = url.searchParams.get("id");
contactForm(photographerId);
console.log(photographerId);

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
        let selectedPhotographer = "";
        // Parcour le tableau des photographes
        for (let i = 0; i < photographers.length; i++) {
            if (photographers[i].id === parseInt(photographerId)) {
                selectedPhotographer = photographers[i];
            }
        }

        photographerTemplate(selectedPhotographer);
        // console.log(selectedPhotographer);
    })
    .catch((error) => {
        console.error(error);
    });
