/**
 * Calcule le nombre total de likes pour un photographe à partir de ses médias.
 *
 * @param {number} photographerId - L'identifiant du photographe.
 * @param {Array} medias - Les médias associés au photographe.
 * @returns {number} Le nombre total de likes pour le photographe.
 */

export default function calculateTotalLikes(photographerId, medias) {
    return medias.reduce((totalLikes, media) => {
        if (media.photographerId === photographerId) {
            totalLikes += media.likes;
        }
        return totalLikes;
    }, 0);
}
