export default function photoTemplate(media) {
    const { photographerId, title, image, likes, price, date, id } = media;

    function getPhotoCardDOM() {
        let photoContent = document.createElement("div");
        photoContent.classList.add("photo_content");

        // Créer tout les HTMML d'une card media (image, like, title..etc)
        const imgElt = document.createElement("img");
        imgElt.src = `assets/photographers/${photographerId}/${media.image}`;
        imgElt.classList.add("card_photo");
        imgElt.setAttribute("alt", `${title}`);
        photoContent.appendChild(imgElt);

        const photoInfo = document.createElement("div");
        photoInfo.classList.add("photo_info");
        photoContent.appendChild(photoInfo);

        const photoTitle = document.createElement("p");
        photoTitle.classList.add("photo_title");
        photoTitle.textContent = title;
        photoInfo.appendChild(photoTitle);

        const photoLikes = document.createElement("span");
        photoLikes.classList.add("photo_likes");
        photoLikes.textContent = ` ${likes}  `;
        photoInfo.appendChild(photoLikes);

        const heartIcon = document.createElement("i");
        heartIcon.classList.add("fa-sharp", "fa-solid", "fa-heart", "heart-full");
        photoLikes.appendChild(heartIcon);

        return photoContent;
    }

    return { photographerId, title, image, likes, price, date, id, getPhotoCardDOM };
}
