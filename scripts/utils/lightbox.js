// import imageOrVideo from "../templates/cardPhotographs.js";

// const main = document.getElementById("main");
// const body = document.body;
// const lightboxModal = document.getElementById("lightbox_container");

// const nextBtn = document.getElementById("dropdown-icon-left");
// const previousBtn = document.getElementById("dropdown-icon-right");

export default function lightbox(data) {
    const lightboxCloseBtn = document.querySelector(".lightbox_close");
    const lightboxTitle = document.querySelector(".photo_title");
    const openLightboxMedias = document.querySelectorAll(".media_elt");
    const btnsContainer = document.querySelector(".icon-nav");
    const lightboxModal = document.getElementById("lightbox_container");

    let currentIndex = -1;

    function renderModal() {
        let nextBtn = document.createElement("i");
        nextBtn.id = "dropdown-icon-left";
        nextBtn.classList.add("fas", "fa-chevron-left", "chevron-nav");
        nextBtn.style.display = "block";
        btnsContainer.appendChild(nextBtn);

        let previousBtn = document.createElement("i");
        previousBtn.id = "dropdown-icon-right";
        previousBtn.classList.add("fas", "fa-chevron-right", "chevron-nav");
        previousBtn.style.display = "block";
        btnsContainer.appendChild(previousBtn);

        previousBtn.addEventListener("click", () => {
            currentIndex = (currentIndex + 1) % data.media.length;
            displayMediaInModal(data.media[currentIndex]);
        });

        nextBtn.addEventListener("click", () => {
            currentIndex = (currentIndex - 1 + data.media.length) % data.media.length;
            displayMediaInModal(data.media[currentIndex]);
        });

        // Systeme de close modal
    }
    renderModal();

    // Ouverture de la modal au click sur un media
    openLightboxMedias.forEach((media, index) => {
        media.addEventListener("click", (e) => {
            // Utilisez les propriétés de l'élément média sélectionné
            // console.log(e.target);
            // const selectedMedia = data.media.filter((elt) => media.getAttribute("alt") === `titre : ${elt.title}`);

            // currentIndex = data.media.indexOf(selectedMedia[0]);
            currentIndex = index;
            displayMediaInModal(data.media[currentIndex]);
            openModal();
        });
    });

    function displayMediaInModal(clickedMedia) {
        const oldMediaLightbox = lightboxModal.querySelector(".mediaLightBox");
        if (oldMediaLightbox) {
            oldMediaLightbox.remove();
        }

        let lightboxMedia;
        if (!clickedMedia.video) {
            lightboxMedia = document.createElement("img");
            lightboxMedia.src = `assets/photographers/${clickedMedia.photographerId}/${clickedMedia.image}`;
        } else {
            lightboxMedia = document.createElement("video");
            lightboxMedia.src = `assets/photographers/${clickedMedia.photographerId}/${clickedMedia.video}`;
            lightboxMedia.setAttribute("controls", "video/mp4");
            lightboxMedia.autoplay = false;
            lightboxMedia.controls = true;
        }
        lightboxMedia.classList.add("mediaLightBox");
        lightboxMedia.alt = `titre : ${clickedMedia.title}`;

        lightboxModal.appendChild(lightboxMedia);
        lightboxTitle.textContent = clickedMedia.title;
    }

    function openModal() {
        lightboxModal.style.display = "flex";
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
