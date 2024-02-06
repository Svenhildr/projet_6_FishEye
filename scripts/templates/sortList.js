/**
 * Trie une liste de médias en fonction du critère de tri sélectionné.
 *
 * @param {string} selectedSort - Le critère de tri sélectionné ("Popularité", "Date" ou "Titre").
 * @param {Array} mediaList - La liste de médias à trier.
 * @returns {Array} La liste de médias triée selon le critère spécifié.
 */
export default function sortMedia(selectedSort, mediaList) {
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

/**
 * Trie une liste de médias par popularité (nombre de likes).
 *
 * @param {Array} mediaList - La liste de médias à trier.
 * @returns {Array} La liste de médias triée par popularité.
 */
function sortByPopularity(mediaList) {
    return mediaList.sort((a, b) => b.likes - a.likes);
}

/**
 * Trie une liste de médias par date de création (du plus récent au plus ancien).
 *
 * @param {Array} mediaList - La liste de médias à trier.
 * @returns {Array} La liste de médias triée par date.
 */
function sortByDate(mediaList) {
    return mediaList.sort((a, b) => new Date(b.date) - new Date(a.date));
}

/**
 * Trie une liste de médias par titre (ordre alphabétique).
 *
 * @param {Array} mediaList - La liste de médias à trier.
 * @returns {Array} La liste de médias triée par titre.
 */
function sortByTitle(mediaList) {
    return mediaList.sort((a, b) => a.title.localeCompare(b.title));
}
