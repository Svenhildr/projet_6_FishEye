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
//tri par likes
function sortByPopularity(mediaList) {
    return mediaList.sort((a, b) => b.likes - a.likes);
}

// Factory function pour trier par date
function sortByDate(mediaList) {
    return mediaList.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Factory function pour trier par titre
function sortByTitle(mediaList) {
    return mediaList.sort((a, b) => a.title.localeCompare(b.title));
}
