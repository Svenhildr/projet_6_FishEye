export default function mediaCardTemplate(data) {
    const { photographerId, title, likes, video, image } = data;

    function imageOrVideo(video, photographerId, title, image) {
        let mediaElt;
        if (video) {
            mediaElt = document.createElement("video");
            mediaElt.src = `assets/photographers/${photographerId}/${video}`;
            mediaElt.classList.add("card_video");
            mediaElt.setAttribute("alt", `titre : ${title}`);
            // mediaElt.setAttribute("controls", "video/mp4");
        } else {
            mediaElt = document.createElement("img");
            mediaElt.src = `assets/photographers/${photographerId}/${image}`;
            mediaElt.classList.add("card_image");
            mediaElt.setAttribute("alt", `titre : ${title}`);
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

        const likesElt = document.createElement("span");
        likesElt.classList.add("likes_media");
        likesElt.textContent = ` ${likes} `;
        infoDiv.appendChild(likesElt);

        const heartIcon = document.createElement("i");
        heartIcon.classList.add("fa-sharp", "fa-solid", "fa-heart", "heart-full");
        likesElt.appendChild(heartIcon);

        return cardContent;
    }

    return { createCard };
}
