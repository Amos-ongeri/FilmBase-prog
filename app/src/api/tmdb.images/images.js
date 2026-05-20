const serverUrl = import.meta.env.VITE_SERVER_URL;

const imagesMap = new Map();

export const getImages = async (media_type, id) => {
    let imagesData;
    if(imagesMap.has(`images: ${id}`)){
        imagesData = imagesMap.get(`images: ${id}`);
    } else {
        const res = await fetch(`${serverUrl}/api/${media_type}/${id}/images`);

        const images = await res.json();

        imagesMap.set(`images: ${id}`, images);

        imagesData = images
    }

    return imagesData;
}