export default function calculateTotalLikes(photographerId, medias) {
    return medias.reduce((totalLikes, media) => {
        if (media.photographerId === photographerId) {
            totalLikes += media.likes || 0;
        }
        return totalLikes;
    }, 0);
}
