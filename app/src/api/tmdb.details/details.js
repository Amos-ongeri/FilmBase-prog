// const serverUrl = import.meta.env.VITE_SERVER_URL;
const serverUrl = 'http://localhost:5000'

const detailsMap = new Map();

export const getDetails = async (tmdb_id, media_type) => {
    let details;
    try{
        if(detailsMap.has(tmdb_id)){
            details = detailsMap.get(tmdb_id)
            return details;
        }else{
        const dets = await fetch(`${serverUrl}/api/${tmdb_id}/${media_type}/details`)
            details = await dets?.json();

            detailsMap.set(tmdb_id,details);
            return details;
        }
    }catch(e){
        console.log(e.message);
    }
}