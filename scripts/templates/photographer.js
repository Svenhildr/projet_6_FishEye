function photographerTemplate(data) {
    const { name, portrait, city, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement("article");
        const img = document.createElement("img");
        img.setAttribute("src", picture);

        const h2 = document.createElement("h2");
        h2.textContent = name;
        article.appendChild(img);
        article.appendChild(h2);

        const cardInfos = document.createElement("div");
        cardInfos.classList.add("card_infos");
        article.appendChild(cardInfos);

        let cityText = document.createElement("span");
        cityText.classList.add("card_city");
        cardInfos.appendChild(cityText);
        cityText.textContent = city;

        let quoteText = document.createElement("p");
        quoteText.classList.add("card_quote");
        cardInfos.appendChild(quoteText);
        quoteText.textContent = tagline;

        let priceText = document.createElement("span");
        priceText.classList.add("card_price");
        cardInfos.appendChild(priceText);
        priceText.textContent = price;

        return article;
    }

    return { name, picture, city, tagline, price, getUserCardDOM };
}
