// const serverUrl = import.meta.env.VITE_SERVER_URL;
const serverUrl = 'http://localhost:5000'

const reviewsMap = new Map();

export const getReviews = async (tmdb_id, media_type)=>{
    let reviews = null;
    try{
        if(reviewsMap.has(tmdb_id)){
            reviews = reviewsMap.get(tmdb_id);
            return reviews;
        }else{
            const revius = await fetch(`${serverUrl}/api/${tmdb_id}/${media_type}/reviews`)
            const reviewsData = await revius.json();
            reviewsMap.set(tmdb_id,reviewsData?.results);
            reviews = reviewsData.results;

            return reviews;
        }
    }catch(e){
        console.log('error occurred: ',e.message);
    }
}