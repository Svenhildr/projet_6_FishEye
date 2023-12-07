// import { openLightbox } from "../utils/lightbox.js";
export default function mediaCardTemplate(data) {
    const { photographerId, title, likes, video, image } = data;
    // let openLightbox;
    // let openLightboxMedias;
    function imageOrVideo(video, photographerId, title, image) {
        let mediaElt;
        if (video) {
            mediaElt = document.createElement("video");
            mediaElt.src = `assets/photographers/${photographerId}/${video}`;
            mediaElt.classList.add("card_video", "media_elt");
            mediaElt.setAttribute("alt", `titre : ${title}`);
            mediaElt.setAttribute("data-media-id", photographerId); // Ajoutez un identifiant unique
            // mediaElt.addEventListener("click", openLightbox);
            // mediaElt.setAttribute("controls", "video/mp4");
        } else {
            mediaElt = document.createElement("img");
            mediaElt.src = `assets/photographers/${photographerId}/${image}`;
            mediaElt.classList.add("card_image", "media_elt");
            mediaElt.setAttribute("alt", `titre : ${title}`);
            mediaElt.setAttribute("data-media-id", photographerId); // Ajoutez un identifiant unique
            // mediaElt.addEventListener("click", openLightbox);
        }
        return mediaElt;
    }

    function createCard() {
        const cardContent = document.createElement("div");
        cardContent.classList.add("card_content");

        const mediaElt = imageOrVideo(video, photographerId, title, image);
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
        // likesElt.innerHTML += '<i class="fa-sharp fa-solid fa-heart heart-full like_btn"></i>';
        photoLikesContainer.appendChild(likesElt);

        const heartIcon = document.createElement("i");
        heartIcon.classList.add("fa-sharp", "fa-solid", "fa-heart", "heart-full", "like_btn");
        photoLikesContainer.appendChild(heartIcon);

        return cardContent;
    }

    return { createCard };
}
