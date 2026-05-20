const serverUrl = import.meta.env.VITE_SERVER_URL;

const trendingMap = new Map();

export const getTrending = async (media_type, time_window) => {
    let trending = {}
    try{
        if(trendingMap.has('trending')){
            trending["trending"] = trendingMap.get('trending');
            return trending["trending"];
        }else{
            const res = await fetch(`${serverUrl}/api/${media_type}/${time_window}/trending`)
            const data = await res.json();
            trendingMap.set('trending', data.results)
            trending["trending"] = data.results;
        }
    }catch(e){
        console.log('error occurred: ', e.message);
    }

    return trending["trending"];
}