const serverUrl = import.meta.env.VITE_SERVER_URL;

const similarMap = new Map();

export const getSimilar = async (tmdb_id, media_type)=>{
    let similar = null;
    try{
        if(similarMap.has(tmdb_id)){
            similar = similarMap.get(tmdb_id);
            return similar;
        }else{
            const ofSimilar = await fetch(`${serverUrl}/api/${tmdb_id}/${media_type}/similar`)
            const similarData = await ofSimilar.json();

            const similars = similarData?.results?.map(item=>({
                ...item,
                media_type: media_type
            }))
            similarMap.set(tmdb_id,similars);
            similar = similars;

            return similar;
        }
    }catch(e){
        console.log('error occurred: ',e.message);
    }
}