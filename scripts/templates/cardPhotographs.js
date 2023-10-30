/* export default function photoTemplate(media) {
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
} */

/*  export default function mediaFactory(media) {

    if (media.video) {
        return {
            createVideoCard: function createVideoCard() {
                const { photographerId, title, video, likes } = media;
                let videoContent = document.createElement("div");
                videoContent.classList.add("video_content");

                // Créer tout le HTML d'une carte d'image (image, like, title, etc.)
                const videoElt = document.createElement("video");
                videoElt.src = `assets/photographers/${photographerId}/${video}`;
                videoElt.classList.add("card_video");
                videoElt.setAttribute("alt", title);
                videoContent.appendChild(videoElt);

                const photoInfo = document.createElement("div");
                photoInfo.classList.add("video_info");
                videoContent.appendChild(photoInfo);

                const photoTitle = document.createElement("p");
                photoTitle.classList.add("video_title");
                photoTitle.textContent = title;
                photoInfo.appendChild(photoTitle);

                const photoLikes = document.createElement("span");
                photoLikes.classList.add("video_likes");
                photoLikes.textContent = ` ${likes}  `;
                photoInfo.appendChild(photoLikes);

                const heartIcon = document.createElement("i");
                heartIcon.classList.add("fa-sharp", "fa-solid", "fa-heart", "heart-full");
                photoLikes.appendChild(heartIcon);

                return videoContent;
            },
        };
    } else {
        return {
            createImageCard: function createImageCard() {
                const { photographerId, title, image, likes } = media;
                let photoContent = document.createElement("div");
                photoContent.classList.add("photo_content");

                // Créer tout le HTML d'une carte d'image (image, like, title, etc.)
                const imgElt = document.createElement("img");
                imgElt.src = `assets/photographers/${photographerId}/${image}`;
                imgElt.classList.add("card_photo");
                imgElt.setAttribute("alt", title);
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
            },
        };
    }
}
*/

//creation des cartes selon le media

export default class MediaCard {
    constructor(photographerId, title, likes, video, image) {
        this.photographerId = photographerId;
        this.title = title;
        this.likes = likes;
        this.video = video;
        this.image = image;
    }

    createCard() {
        const cardContent = document.createElement("div");
        cardContent.classList.add("card_content");

        if (this.video) {
            const videoElt = document.createElement("video");
            videoElt.src = `assets/photographers/${this.photographerId}/${this.video}`;
            videoElt.classList.add("card_video");
            videoElt.setAttribute("alt", `titre : ${this.title}`);
            videoElt.setAttribute("controls", "video/mp4");
            cardContent.appendChild(videoElt);
        } else {
            const imgElt = document.createElement("img");
            imgElt.src = `assets/photographers/${this.photographerId}/${this.image}`;
            imgElt.classList.add("card_image");
            imgElt.setAttribute("alt", `titre : ${this.title}`);
            cardContent.appendChild(imgElt);
        }

        const infoDiv = document.createElement("div");
        infoDiv.classList.add("info_media");
        cardContent.appendChild(infoDiv);

        const titleElt = document.createElement("p");
        titleElt.classList.add("title_media");
        titleElt.textContent = this.title;
        infoDiv.appendChild(titleElt);

        const likesElt = document.createElement("span");
        likesElt.classList.add("likes_media");
        likesElt.textContent = ` ${this.likes} `;
        infoDiv.appendChild(likesElt);

        const heartIcon = document.createElement("i");
        heartIcon.classList.add("fa-sharp", "fa-solid", "fa-heart", "heart-full");
        likesElt.appendChild(heartIcon);

        return cardContent;
    }
}
