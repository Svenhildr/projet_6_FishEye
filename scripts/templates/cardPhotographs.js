/**
 * Génère un modèle de carte média en fonction des données fournies.
 *
 * @param {Object} data - Les données du média, comprenant photographerId, title, likes, video et image.
 * @returns {Object} Un objet contenant la fonction createCard qui crée une carte média HTML.
 */
export default function mediaCardTemplate(data) {
    const { photographerId, title, likes, video, image } = data;

    /**
     * Sélectionne et crée l'élément HTML approprié pour le média (image ou vidéo).
     *
     * @param {string} video - Le nom du fichier vidéo, le cas échéant.
     * @param {number} photographerId - L'identifiant du photographe.
     * @param {string} title - Le titre du média.
     * @param {string} image - Le nom du fichier image.
     * @returns {HTMLElement} L'élément HTML représentant le média.
     */
    function imageOrVideo(video, photographerId, title, image) {
        let mediaElt;
        if (video) {
            mediaElt = document.createElement("video");
            mediaElt.src = `assets/photographers/${photographerId}/${video}`;
            mediaElt.classList.add("card_video", "media_elt");
            mediaElt.setAttribute("aria-label", `titre : ${title}, cliquez pour afficher dans le carrousel`);
            mediaElt.setAttribute("data-media-id", photographerId); // Ajoute un identifiant unique
            mediaElt.setAttribute("tabindex", "0");
        } else {
            mediaElt = document.createElement("img");
            mediaElt.src = `assets/photographers/${photographerId}/${image}`;
            mediaElt.classList.add("card_image", "media_elt");
            mediaElt.setAttribute("alt", `titre : ${title}, cliquez pour afficher dans le carrousel`);
            mediaElt.setAttribute("data-media-id", photographerId); // Ajoute un identifiant unique
            mediaElt.setAttribute("tabindex", "0");
        }
        return mediaElt;
    }

    /**
     * Crée une carte média HTML en fonction des données fournies.
     *
     * @returns {HTMLElement} L'élément HTML représentant la carte média.
     */
    function createCard() {
        const cardContent = document.createElement("div");
        cardContent.classList.add("card_content");

        const mediaElt = imageOrVideo(video, photographerId, title, image);
        // mediaElt.tabIndex = 4;
        cardContent.appendChild(mediaElt);

        const infoDiv = document.createElement("div");
        infoDiv.classList.add("info_media");
        cardContent.appendChild(infoDiv);

        const titleElt = document.createElement("p");
        titleElt.classList.add("title_media");
        titleElt.textContent = title;
        infoDiv.appendChild(titleElt);

        const photoLikesContainer = document.createElement("div");
        photoLikesContainer.classList.add("Photo_likes");
        infoDiv.appendChild(photoLikesContainer);

        const likesElt = document.createElement("span");
        likesElt.classList.add("likes_media");
        likesElt.textContent = ` ${likes}`;
        // likesElt.setAttribute("role", "status");
        photoLikesContainer.appendChild(likesElt);

        const likeBtnContainer = document.createElement("button");
        likeBtnContainer.classList.add("like_btn");
        /*         likeBtnContainer.setAttribute("tabindex", 0);*/
        likeBtnContainer.setAttribute("aria-label", `Aimer ce média : ${title}`);
        photoLikesContainer.appendChild(likeBtnContainer);

        const heartIcon = document.createElement("i");
        heartIcon.classList.add("fa-sharp", "fa-solid", "fa-heart", "heart-full", "like_btn_icon");
        likeBtnContainer.appendChild(heartIcon);

        const heartSrOnly = document.createElement("span");
        heartSrOnly.classList.add("sr-only");
        heartSrOnly.textContent = "like";
        likeBtnContainer.appendChild(heartSrOnly);

        return cardContent;
    }

    return { createCard };
}
