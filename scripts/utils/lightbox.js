/**
 * Gestion de la lightbox pour afficher les médias en plein écran.
 *
 * @param {Object} data - Les données comprenant les médias à afficher dans la lightbox.
 *                        {Array} media - Liste des médias du photographe.
 */
export default function lightbox(data) {
    const lightboxTitle = document.querySelector(".photo_title");
    const main = document.getElementById("main");
    const openLightboxMedias = document.querySelectorAll(".media_elt");
    const lightboxModal = document.getElementById("lightbox_container");
    let currentIndex = -1;

    /**
     * Fonction pour rendre les éléments de contrôle de la lightbox.
     */
    function renderModal() {
        const btnsContainer = document.querySelector(".icon-nav");
        btnsContainer.innerHTML = "";

        /**
         * Fonction utilitaire pour créer un élément de bouton de navigation.
         *
         * @param {string} id - L'identifiant à attribuer à l'élément créé.
         * @param {string} iconClass - La classe d'icône FontAwesome à attribuer à l'élément créé.
         * @returns {HTMLElement} - L'élément de bouton de navigation créé.
         */
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

    /**
     * Gestion de la navigation entre les médias dans la lightbox.
     *
     * @param {number} direction - La direction de la navigation (-1 pour précédent, 1 pour suivant).
     */
    function handleNavigation(direction) {
        currentIndex = (currentIndex + direction + data.media.length) % data.media.length;
        displayMediaInModal(data.media[currentIndex]);
    }

    /**
     * Ouverture de la lightbox.
     */
    function openLightbox() {
        lightboxModal.style.display = "flex";
        lightboxModal.setAttribute("aria-hidden", "false");
        main.setAttribute("aria-hidden", "true");
        main.style.display = "none";
    }

    /**
     * Fermeture de la lightbox.
     */
    function closeLightbox() {
        lightboxModal.style.display = "none";
        lightboxModal.setAttribute("aria-hidden", "true");
        main.setAttribute("aria-hidden", "false");
        main.style.display = "block";
    }

    /**
     * Gestion des événements clavier.
     */
    document.addEventListener("keydown", (event) => {
        const isLightboxOpen = lightboxModal && lightboxModal.style.display === "flex";

        if (isLightboxOpen) {
            if (event.key === "Escape") {
                closeLightbox();
            } else if (event.key === "ArrowLeft") {
                handleNavigation(-1);
            } else if (event.key === "ArrowRight") {
                handleNavigation(1);
            }
        }
    });

    /**
     * Ouverture de la lightbox sur clic ou appui sur Entrée.
     */
    openLightboxMedias.forEach((media, index) => {
        media.addEventListener("click", () => {
            currentIndex = index;
            displayMediaInModal(data.media[currentIndex]);
            openLightbox();
        });
        media.addEventListener("keydown", (event) => {
            currentIndex = index;

            if (event.key === "Enter") {
                // Vérifiez si la lightbox est déjà ouverte
                const isLightboxOpen = lightboxModal.style.display === "flex";

                if (!isLightboxOpen) {
                    displayMediaInModal(data.media[currentIndex]);
                    openLightbox();
                }
            }
        });
    });

    /**
     * Affichage du média sélectionné dans la lightbox.
     *
     * @param {Object} clickedMedia - Le média sélectionné à afficher.
     */
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

    /**
     * Création d'un élément média (image ou vidéo) pour affichage dans la lightbox.
     *
     * @param {Object} clickedMedia - Le média à afficher.
     * @returns {HTMLElement} - L'élément média créé.
     */
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
            video.autoplay = true;
            // video.controls = true;
            return video;
        }
    }

    // rendu modal
    renderModal();
}
