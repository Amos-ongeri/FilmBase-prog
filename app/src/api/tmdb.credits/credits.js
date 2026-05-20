const serverUrl = import.meta.env.VITE_SERVER_URL;

const creditsMap = new Map();

export const getCredits = async (tmdb_id, media_type)=>{
    let credits = null;
    try{
        if(creditsMap.has(tmdb_id)){
            credits = creditsMap.get(tmdb_id);
            return credits;
        }else{
            const creds = await fetch(`${serverUrl}/api/${tmdb_id}/${media_type}/credits`)
            const creditsData = await creds.json();
            creditsMap.set(tmdb_id,creditsData);
            credits = creditsData;

            return credits;
        }
    }catch(e){
        console.log(e.message);
    }
}