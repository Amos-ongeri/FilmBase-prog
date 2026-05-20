const serverUrl = import.meta.env.VITE_SERVER_URL;

const videosMap = new Map();

export const getVideos = async (tmdb_id, media_type) => {
    try{
        let Videos, trailer;
        if(videosMap.has(tmdb_id)){
            trailer = videosMap.get(tmdb_id);
            return trailer;
        }else{
            const videos = await fetch(`${serverUrl}/api/${tmdb_id}/${media_type}/videos`)
            const videosData = await videos.json();
            Videos = videosData.results;
            trailer = Videos?.filter(d=> d.type === 'Trailer');
            videosMap.set(tmdb_id ,trailer);

            return trailer;
        }
    }catch(e){
        console.log(e.message);
    }
}