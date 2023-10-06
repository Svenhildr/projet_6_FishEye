function photographerTemplate(data) {
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
