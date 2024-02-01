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

const nameRegex = /^[a-zA-Z]{2,}$/;
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

modal.style.display = "none";

openModalBtn.addEventListener("click", openModal);
modalCloseBtn.addEventListener("click", closeModal);
modalCloseBtn.setAttribute("aria-label", "close button");

//ouverture de modal
function openModal() {
    mainWrapper.setAttribute("aria-hidden", "true");
    // mainWrapper.style.display = "none";

    modal.setAttribute("aria-hidden", "false");
    body.classList.add("no-scroll");
    modal.style.display = "flex";
    modalCloseBtn.focus();
}

// Fonction pour fermer la modal
function closeModal() {
    mainWrapper.setAttribute("aria-hidden", "false");
    mainWrapper.style.display = "block";
    modal.setAttribute("aria-hidden", "true");
    body.classList.remove("no-scroll");
    modal.style.display = "none";
    openModalBtn.focus();
}

// gestion de la fermeture de la modal lorsque clic en dehors de celle-ci
document.addEventListener("click", (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

// gestion de la fermeture de la modal en appuyant sur la touche Échap
document.addEventListener("keydown", (event) => {
    const isContactFormOpen = modal.style.display === "flex" ? true : false;

    if (isContactFormOpen && event.key === "Escape") {
        closeModal();
    }
});

form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (checkInput()) {
        console.log("Formulaire valide !");
        console.log("Prénom: " + prenomInput.value);
        console.log("Nom: " + nomInput.value);
        console.log("Email: " + emailInput.value);
        console.log("Email: " + messageInput.value);
        closeModal();
    } else {
        return console.log("erreur de l'envoi du formulaire");
    }
});

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
