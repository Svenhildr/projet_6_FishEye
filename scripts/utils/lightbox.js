// import imageOrVideo from "../templates/cardPhotographs.js";

const main = document.getElementById("main");
const body = document.body;
// const lightboxModal = document.getElementById("lightbox_container");
const lightboxCloseBtn = document.querySelector(".lightbox_close");
const lightboxLeftBtn = document.getElementById("dropdown-icon-left");
const lightboxRightBtn = document.getElementById("dropdown-icon-right");
const lightboxTitle = document.querySelector(".photo_title");

export default function lightbox(data) {
    const openLightboxMedias = document.querySelectorAll(".media_elt");

    openLightboxMedias.forEach((media) => {
        media.addEventListener("click", () => {
            // Utilisez les propriétés de l'élément média sélectionné
            const selectedMedia = data.media.filter((elt) => media.alt === `titre : ${elt.title}`);
            displayMediaInModal(selectedMedia[0]);
        });
    });

    function displayMediaInModal(clickedMedia) {
        const mediaType = clickedMedia.video ? "video" : "img";
        const lightboxModal = document.getElementById("lightbox_container");

        let lightboxPhoto;

        if (mediaType === "img") {
            lightboxPhoto = document.createElement("img");
            lightboxPhoto.src = `assets/photographers/${clickedMedia.photographerId}/${clickedMedia.image}`;
            lightboxPhoto.alt = `titre : ${clickedMedia.title}`;
            lightboxModal.style.display = "flex";
        } else if (mediaType === "video") {
            lightboxPhoto = document.createElement("video");
            lightboxPhoto.src = `assets/photographers/${clickedMedia.photographerId}/${clickedMedia.video}`;
            lightboxPhoto.alt = `titre : ${clickedMedia.title}`;
            lightboxModal.style.display = "flex";
            lightboxPhoto.autoplay = false;
            lightboxPhoto.controls = true;
        }

        lightboxModal.innerHTML = "";

        lightboxModal.appendChild(lightboxPhoto);

        lightboxTitle.textContent = clickedMedia.title;
    }
}

/*
lightboxCloseBtn.addEventListener("click", closeLightbox);

export function openLightbox(event) {
    const clickedMedia = event.target;
    console.log(clickedMedia);
    const mediaType = clickedMedia.tagName.toLowerCase(); // Check if it's an img or video
    const title = clickedMedia.getAttribute("alt");

    main.setAttribute("aria-hidden", "true");
    lightboxModal.setAttribute("aria-hidden", "false");
    body.classList.add("no-scroll");
    clickedMedia.style.display = "flex";

    lightboxTitle.textContent = title;

    // const mediaElt = imageOrVideo(clickedMedia.getAttribute("data-media-id"), title, clickedMedia.src, clickedMedia.src);

    if (mediaType === "img") {
        lightboxPhoto.src = clickedMedia.src;
    } else if (mediaType === "video") {
        lightboxPhoto.src = clickedMedia.src;
        lightboxPhoto.autoplay = false;
        lightboxPhoto.controls = true;
    }
    // lightboxPhoto.src = clickedMedia.src;
    // lightboxPhoto.appendChild(lightboxModal);
}

function closeLightbox() {
    main.setAttribute("aria-hidden", "false");
    lightboxModal.setAttribute("aria-hidden", "true");
    body.classList.remove("no-scroll");
    lightboxPhoto.src = "";
} */
/* function closeLightbox() {
    console.log("ferme");
} */
// console.log(imageOrVideo);

/* export default function openLightbox(data) {
    const { photographerId, title, video, image } = data;
    const lightbox = document.getElementById("lightbox_modal");
    const lightboxMedia = lightbox.querySelector(".lightbox_media");
    const closeIconLightbox = lightbox.querySelector(".close_icon_lightbox");

    function mediaElt(video, photographerId, title, image) {
        let lightboxElt;
        if (video) {
            lightboxElt = document.createElement("video");
            lightboxElt.src = `assets/photographers/${photographerId}/${video}`;
            lightboxElt.classList.add("card_video");
            lightboxElt.setAttribute("alt", `titre : ${title}`);
        } else {
            lightboxElt = document.createElement("img");
            lightboxElt.src = `assets/photographers/${photographerId}/${image}`;
            lightboxElt.classList.add("card_image");
            lightboxElt.setAttribute("alt", `titre : ${title}`);
        }
        return lightboxElt;
    }

    const mediaElement = mediaElt(video, photographerId, title, image);
    lightboxMedia.innerHTML = ""; // Efface le contenu précédent
    lightboxMedia.appendChild(mediaElement);

    lightbox.style.display = "block";

    closeIconLightbox.addEventListener("click", () => {
        lightbox.style.display = "none";
        lightboxMedia.innerHTML = "";
    });
} */

/* export default function openLightbox(data) {
    const { photographerId, title, video, image } = data;
    const lightbox = document.getElementById("lightbox_modal");
    const lightboxMedia = lightbox.querySelector(".lightbox_media");
    const closeIconLightbox = lightbox.querySelector(".close_icon_lightbox");

    function mediaElt(video, photographerId, title, image) {
        let lightboxElt;
        if (video) {
            lightboxElt = document.createElement("video");
            lightboxElt.src = `assets/photographers/${photographerId}/${video}`;
            lightboxElt.classList.add("card_video");
            lightboxElt.setAttribute("alt", `titre : ${title}`);
        } else {
            lightboxElt = document.createElement("img");
            lightboxElt.src = `assets/photographers/${photographerId}/${image}`;
            lightboxElt.classList.add("card_image");
            lightboxElt.setAttribute("alt", `titre : ${title}`);
        }
        return mediaEllightboxElt;
    }

    lightbox.style.display = "block";

    closeIconLightbox.addEventListener("click", () => {
        lightbox.style.display = "none";
        lightboxMedia.innerHTML = ""; // Efface le contenu de la lightbox
    });

    function createLightbox() {
        console.log("clic media");
        //         const info_lightbox = document.createElement("div");
        // info_lightbox.classList.add("lightbox_info");
        // lightboxMedia.appendChild(info_lightbox);

        // const titleElt = document.createElement("p");
        // titleElt.classList.add("lightbox-media_title");
        // titleElt.textContent = title;
        // info_lightbox.appendChild(titleElt);

        // return lightboxMedia; 
    }
    // lightbox.appendChild(lightboxMedia);
} */

/* 
// function media(data) {
// let media = data;
let media = "test";

function showName() {
    // console.log(media);
}

function chnageName(newName) {
    media = newName;
}

//     return { media, chnageName, showName };
// }

// const myParttern = media("test");
// console.log(myParttern);
// myParttern.showName();
// myParttern.chnageName("Thomas");
// myParttern.showName();
// myParttern.chnageName("Julie");
// myParttern.showName();
// console.log(myParttern.media);

showName();
chnageName("Thomas");
showName();

// un média > vérifier si image ou vidéo > retour le HTML */
