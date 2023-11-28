export default function sortMedia(selectedSort, mediaList) {
    // console.log(selectedSort);
    switch (selectedSort) {
        case "Popularité":
            return sortByPopularity(mediaList);
        case "Date":
            return sortByDate(mediaList);
        case "Titre":
            return sortByTitle(mediaList);
        default:
            return mediaList;
    }
}

function sortByPopularity(mediaList) {
    return mediaList.sort((a, b) => b.likes - a.likes);
}

// Factory function pour trier par date
function sortByDate(mediaList) {
    if (!mediaList) {
        console.error("Media list is undefined or null.");
        return [];
    }

    // Filter out entries without a valid date property
    const validMediaList = mediaList.filter((media) => media && media.date);

    const sortedMediaList = validMediaList.slice().sort((a, b) => new Date(b.date) - new Date(a.date));

    return sortedMediaList;
}

// Factory function pour trier par titre
function sortByTitle(mediaList) {
    return mediaList.sort((a, b) => a.title.localeCompare(b.title));
}
