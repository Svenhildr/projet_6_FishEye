export default function calculateTotalLikes(photographerId, medias) {
    return medias.reduce((totalLikes, media) => {
        if (media.photographerId === photographerId) {
            totalLikes += media.likes;
        }
        return totalLikes;
    }, 0);
}

/* function addLike{

} */
