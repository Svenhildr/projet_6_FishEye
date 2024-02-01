// export default function lightbox(data) {
//     const lightboxTitle = document.querySelector(".photo_title");
//     const main = document.getElementById("main");
//     const openLightboxMedias = document.querySelectorAll(".media_elt");
//     const lightboxModal = document.getElementById("lightbox_container");

//     let currentIndex = -1;

//     function renderModal() {
//         const btnsContainer = document.querySelector(".icon-nav");
//         btnsContainer.innerHTML = "";
//         // lightboxModal.appendChild(btnsContainer);

//         /*         const navBtns = document.createElement("div");
//         btnsContainer.appendChild(navBtns) */

//         let lightboxCloseBtn = document.createElement("img");
//         lightboxCloseBtn.src = `assets/icons/close.svg`;
//         lightboxCloseBtn.classList.add("close_btn");
//         lightboxCloseBtn.style.display = "flex";
//         lightboxCloseBtn.setAttribute("aria-label", "close button");
//         lightboxModal.appendChild(lightboxCloseBtn);

//         let nextBtn = document.createElement("i");
//         nextBtn.id = "nav-icon-left";
//         nextBtn.classList.add("fas", "fa-chevron-left", "chevron-nav");
//         nextBtn.style.display = "block";
//         btnsContainer.appendChild(nextBtn);

//         // displayMediaInModal(clickedMedia);

//         let previousBtn = document.createElement("i");
//         previousBtn.id = "nav-icon-right";
//         previousBtn.classList.add("fas", "fa-chevron-right", "chevron-nav");
//         previousBtn.style.display = "block";
//         btnsContainer.appendChild(previousBtn);

//         // previousButton();
//         // nextButton();
//         previousBtn.addEventListener("click", () => {
//             currentIndex = (currentIndex + 1) % data.media.length;
//             displayMediaInModal(data.media[currentIndex]);
//         });

//         nextBtn.addEventListener("click", () => {
//             currentIndex = (currentIndex - 1 + data.media.length) % data.media.length;
//             displayMediaInModal(data.media[currentIndex]);
//         });

//         lightboxCloseBtn.addEventListener("click", () => {
//             closeLightbox();
//         });

//         // Systeme de close modal
//     }
//     renderModal();

//     // Ouverture de la modal au click sur un media
//     openLightboxMedias.forEach((media, index) => {
//         media.addEventListener("click", (e) => {
//             currentIndex = index;
//             displayMediaInModal(data.media[currentIndex]);
//             openLightbox();
//         });
//     });

//     function displayMediaInModal(clickedMedia) {
//         const oldMediaLightbox = lightboxModal.querySelector(".mediaLightBox");
//         if (oldMediaLightbox) {
//             oldMediaLightbox.remove();
//         }

//         let lightboxMedia;
//         if (!clickedMedia.video) {
//             lightboxMedia = document.createElement("img");
//             lightboxMedia.src = `assets/photographers/${clickedMedia.photographerId}/${clickedMedia.image}`;
//             lightboxMedia.setAttribute("alt", ` ${clickedMedia.title}`);
//         } else {
//             lightboxMedia = document.createElement("video");
//             lightboxMedia.src = `assets/photographers/${clickedMedia.photographerId}/${clickedMedia.video}`;
//             lightboxMedia.setAttribute("type", "video/mp4");
//             lightboxMedia.setAttribute("aria-label", ` ${clickedMedia.title}`);
//             lightboxMedia.autoplay = false;
//             lightboxMedia.controls = true;
//         }
//         lightboxMedia.classList.add("mediaLightBox");
//         lightboxMedia.alt = `titre : ${clickedMedia.title}`;

//         lightboxModal.appendChild(lightboxMedia);
//         lightboxTitle.textContent = clickedMedia.title;
//     }

//     document.addEventListener("keydown", (event) => {
//         console.log("Key pressed:", event.key);
//         const lightboxModal = document.getElementById("lightbox_container");
//         const isLightboxOpen = lightboxModal.style.display === "flex" ? true : false;
//         const card = document.querySelector(".card_content");

//         // console.log(lightboxModal.style.display);
//         if (!isLightboxOpen && event.key === "Enter") {
//             currentIndex = 0;
//             displayMediaInModal(data.media[currentIndex]);
//             openLightbox();
//         } else if (isLightboxOpen) {
//             if (event.key === "Escape") {
//                 closeLightbox();
//             } else if (event.key === "ArrowLeft") {
//                 // renderModal();
//                 currentIndex = (currentIndex + 1) % data.media.length;
//                 displayMediaInModal(data.media[currentIndex]);
//             } else if (event.key === "ArrowRight") {
//                 // renderModal();
//                 currentIndex = (currentIndex - 1 + data.media.length) % data.media.length;
//                 displayMediaInModal(data.media[currentIndex]);
//             }
//         }
//     });

//     function openLightbox() {
//         lightboxModal.style.display = "flex";
//         lightboxModal.setAttribute("aria-hidden", "false");
//         main.setAttribute("aria-hidden", "true");
//         main.style.display = "none";
//     }
//     function closeLightbox() {
//         lightboxModal.style.display = "none";
//         lightboxModal.setAttribute("aria-hidden", "true");
//         main.setAttribute("aria-hidden", "false");
//         main.style.display = "block";
//     }
// }

// function previousButton() {
//     let currentIndex = -1;
//     let previousBtn = document.getElementById("nav-icon-left");
//     previousBtn.addEventListener("click", () => {
//         currentIndex = (currentIndex + 1) % data.media.length;
//         displayMediaInModal(data.media[currentIndex]);
//     });
// }

// function nextButton() {
//     let currentIndex = -1;
//     let nextBtn = document.getElementById("nav-icon-right");
//     nextBtn.addEventListener("click", () => {
//         currentIndex = (currentIndex - 1 + data.media.length) % data.media.length;
//         displayMediaInModal(data.media[currentIndex]);
//     });
// }

//
export default function lightbox(data) {
    const lightboxTitle = document.querySelector(".photo_title");
    const main = document.getElementById("main");
    const openLightboxMedias = document.querySelectorAll(".media_elt");
    const lightboxModal = document.getElementById("lightbox_container");
    const card = document.querySelector(".card_content");
    // console.log(card);
    let currentIndex = -1;

    function renderModal() {
        const btnsContainer = document.querySelector(".icon-nav");
        btnsContainer.innerHTML = "";

        const createButton = (id, iconClass) => {
            const button = document.createElement("i");
            button.id = id;
            button.classList.add("fas", iconClass, "chevron-nav");
            button.style.display = "block";
            return button;
        };

        const lightboxCloseBtn = document.createElement("img");
        lightboxCloseBtn.src = `assets/icons/close.svg`;
        lightboxCloseBtn.classList.add("close_btn");
        lightboxCloseBtn.style.display = "flex";
        lightboxCloseBtn.setAttribute("aria-label", "close button");
        lightboxModal.appendChild(lightboxCloseBtn);

        const nextBtn = createButton("nav-icon-left", "fa-chevron-left");
        const previousBtn = createButton("nav-icon-right", "fa-chevron-right");

        btnsContainer.appendChild(nextBtn);
        btnsContainer.appendChild(previousBtn);

        previousBtn.addEventListener("click", () => handleNavigation(1));
        nextBtn.addEventListener("click", () => handleNavigation(-1));
        lightboxCloseBtn.addEventListener("click", closeLightbox);
    }

    //gestion nativation dans les medias de la lightbox
    function handleNavigation(direction) {
        currentIndex = (currentIndex + direction + data.media.length) % data.media.length;
        displayMediaInModal(data.media[currentIndex]);
    }
    //gestion d'ouverture et fermeture de la modal lightbox
    function openLightbox() {
        lightboxModal.style.display = "flex";
        lightboxModal.setAttribute("aria-hidden", "false");
        main.setAttribute("aria-hidden", "true");
        main.style.display = "none";
    }

    function closeLightbox() {
        lightboxModal.style.display = "none";
        lightboxModal.setAttribute("aria-hidden", "true");
        main.setAttribute("aria-hidden", "false");
        main.style.display = "block";
    }

    // Event listeners keyboard

    document.addEventListener("keydown", (event) => {
        const isLightboxOpen = lightboxModal && lightboxModal.style.display === "flex";

        if (isLightboxOpen) {
            if (event.key === "Escape") {
                closeLightbox();
            } else if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
                handleNavigation(event.key === "ArrowLeft" ? 1 : -1);
            }
        }
    });

    // Ouverture on click
    openLightboxMedias.forEach((media, index) => {
        console.log(media);
        media.addEventListener("click", () => {
            currentIndex = index;
            displayMediaInModal(data.media[currentIndex]);
            openLightbox();
        });
        media.addEventListener("keydown", (event) => {
            console.log("key");
            // const lightboxModal = document.getElementById("lightbox_container");
            const isLightboxOpen = lightboxModal && lightboxModal.style.display === "flex";
            currentIndex = index;

            if (!isLightboxOpen && event.key === "Enter") {
                displayMediaInModal(data.media[currentIndex]);
                openLightbox();
            }
        });
    });

    //display du medias selectionné dans la lightbox
    function displayMediaInModal(clickedMedia) {
        const oldMediaLightbox = lightboxModal.querySelector(".mediaLightBox");
        if (oldMediaLightbox) {
            oldMediaLightbox.remove();
        }

        const lightboxMedia = createMediaElement(clickedMedia);
        lightboxMedia.classList.add("mediaLightBox");
        lightboxModal.appendChild(lightboxMedia);
        lightboxTitle.textContent = clickedMedia.title;
    }

    //gestion des médias images ou video
    function createMediaElement(clickedMedia) {
        if (!clickedMedia.video) {
            const img = document.createElement("img");
            img.src = `assets/photographers/${clickedMedia.photographerId}/${clickedMedia.image}`;
            img.setAttribute("alt", clickedMedia.title);
            return img;
        } else {
            const video = document.createElement("video");
            video.src = `assets/photographers/${clickedMedia.photographerId}/${clickedMedia.video}`;
            video.setAttribute("type", "video/mp4");
            video.setAttribute("aria-label", clickedMedia.title);
            video.autoplay = false;
            video.controls = true;
            return video;
        }
    }

    // rendu modal
    renderModal();
}
