const mainWrapper = document.getElementById("main");
const modal = document.getElementById("contact_modal");
const modalCloseBtn = document.querySelector("#contact_modal header img");
const body = document.body;
const openModalBtn = document.querySelector(".contact_button");
const form = document.querySelector("form");

const prenomInput = document.getElementById("input_prenom");
const nomInput = document.getElementById("input_nom");
const emailInput = document.getElementById("input_email");
const messageInput = document.getElementById("input_message");

// Expressions régulières pour la validation des champs
const nameRegex = /^[a-zA-Z]{2,}$/;
const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

// Initialisation du style de la modal
modal.style.display = "none";

// Ajout des gestionnaires d'événements pour ouvrir et fermer la modal
openModalBtn.addEventListener("click", openModal);
modalCloseBtn.addEventListener("click", closeModal);
modalCloseBtn.setAttribute("aria-label", "close button");
modalCloseBtn.setAttribute("alt", "Fermeture formulaire");

/**
 * Ouverture de la modal.
 */
function openModal() {
    mainWrapper.setAttribute("aria-hidden", "true");
    modal.setAttribute("aria-hidden", "false");
    body.classList.add("no-scroll");
    modal.style.display = "flex";
    prenomInput.focus();
}

/**
 * fermeture de la modal.
 */
function closeModal() {
    mainWrapper.setAttribute("aria-hidden", "false");
    mainWrapper.style.display = "block";
    modal.setAttribute("aria-hidden", "true");
    body.classList.remove("no-scroll");
    modal.style.display = "none";
    openModalBtn.focus();
}

/**
 * Gestion de la fermeture de la modal lorsqu'un clic est effectué en dehors d'elle.
 */
document.addEventListener("click", (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

/**
 * Gestion de la fermeture de la modal en appuyant sur la touche Échap.
 */
document.addEventListener("keydown", (event) => {
    const isContactFormOpen = modal.style.display === "flex" ? true : false;

    if (isContactFormOpen && event.key === "Escape") {
        closeModal();
    }
});

/**
 * Ajoute un gestionnaire d'événements pour la soumission du formulaire.
 */
form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (checkInput()) {
        console.log("Formulaire valide !");
        console.log("Prénom: " + prenomInput.value);
        console.log("Nom: " + nomInput.value);
        console.log("Email: " + emailInput.value);
        console.log("Message: " + messageInput.value);
        closeModal();
    } else {
        return console.log("erreur de l'envoi du formulaire");
    }
});

/**
 * Fonction pour vérifier la validité des champs du formulaire.
 * @returns {boolean} - true si le formulaire est valide, sinon false.
 */
function checkInput() {
    const prenomValue = prenomInput.value;
    const nomValue = nomInput.value;
    const emailValue = emailInput.value;
    let valid = true;

    const prenomError = document.getElementById("prenom_error");
    prenomError.textContent = "";

    const nomError = document.getElementById("nom_error");
    nomError.textContent = "";

    const emailError = document.getElementById("email_error");
    emailError.textContent = "";

    if (!nameRegex.test(prenomValue)) {
        prenomError.textContent = "Veuillez renseigner un prénom valide";
        valid = false;
    }

    if (!nameRegex.test(nomValue)) {
        nomError.textContent = "Veuillez renseigner un nom valide";
        valid = false;
    }

    if (!emailRegex.test(emailValue)) {
        emailError.textContent = "Veuillez renseigner une adresse email valide";
        valid = false;
    }

    return valid;
}
