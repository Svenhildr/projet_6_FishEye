/**
 * Fonction de modèle pour créer la carte d'un photographe. (factory function)
 *
 * @param {Object} data - Les données du photographe.
 *                        {string} name - Le nom du photographe.
 *                        {string} portrait - Le chemin du portrait du photographe.
 *                        {string} city - La ville du photographe.
 *                        {string} tagline - La phrase d'accroche du photographe.
 *                        {number} price - Le prix du photographe par jour.
 *                        {number} id - L'identifiant unique du photographe.
 * @returns {Object} - Un objet contenant des propriétés du photographe et une fonction pour obtenir la carte DOM.
 */
export default function photographerTemplate(data) {
    const { name, portrait, city, tagline, price, id } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const cardContainer = document.createElement("div");
        cardContainer.classList.add("card_container");

        const article = document.createElement("article");

        const img = document.createElement("img");
        img.classList.add("card_img");
        img.setAttribute("src", picture);
        img.setAttribute("alt", `portrait de ${name}`);
        article.appendChild(img);

        const h2 = document.createElement("h2");
        h2.textContent = name;
        article.appendChild(h2);

        const link = document.createElement("a");
        link.href = `photographer.html?id=${id}`;
        link.setAttribute("aria-label", `${name}`);
        link.appendChild(article);

        cardContainer.appendChild(link);

        const cardInfos = document.createElement("div");
        cardInfos.classList.add("card_infos");

        let cityText = document.createElement("span");
        cityText.classList.add("card_city");
        cityText.textContent = city;
        cardInfos.appendChild(cityText);

        let quoteText = document.createElement("p");
        quoteText.classList.add("card_quote");
        quoteText.textContent = tagline;
        cardInfos.appendChild(quoteText);

        let priceText = document.createElement("span");
        priceText.classList.add("card_price");
        priceText.textContent = price + " € / Jour";
        cardInfos.appendChild(priceText);

        cardContainer.appendChild(cardInfos);

        return cardContainer;
    }

    return { name, picture, city, tagline, price, id, getUserCardDOM };
}
