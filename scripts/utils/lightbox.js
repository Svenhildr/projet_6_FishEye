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
