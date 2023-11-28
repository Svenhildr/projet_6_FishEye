export default function lightbox(data) {
    const lightboxTitle = document.querySelector(".photo_title");
    const openLightboxMedias = document.querySelectorAll(".media_elt");
    const lightboxModal = document.getElementById("lightbox_container");

    let currentIndex = -1;

    function renderModal() {
        const btnsContainer = document.querySelector(".icon-nav");
        lightboxModal.appendChild(btnsContainer);

        const navBtns = document.createElement("div");
        btnsContainer.appendChild(navBtns);

        let lightboxCloseBtn = document.createElement("img");
        lightboxCloseBtn.src = `assets/icons/close.svg`;
        lightboxCloseBtn.classList.add("close_btn");
        lightboxCloseBtn.style.display = "block";
        btnsContainer.appendChild(lightboxCloseBtn);

        let nextBtn = document.createElement("i");
        nextBtn.id = "dropdown-icon-left";
        nextBtn.classList.add("fas", "fa-chevron-left", "chevron-nav");
        nextBtn.style.display = "block";
        btnsContainer.appendChild(nextBtn);

        // displayMediaInModal(clickedMedia);

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
        lightboxCloseBtn.addEventListener("click", () => {
            closeLightbox();
        });

        // Systeme de close modal
    }
    renderModal();

    // Ouverture de la modal au click sur un media
    openLightboxMedias.forEach((media, index) => {
        media.addEventListener("click", (e) => {
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
    function closeLightbox() {
        lightboxModal.style.display = "none";
    }
}
