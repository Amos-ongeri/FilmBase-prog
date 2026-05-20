const serverUrl = import.meta.env.VITE_SERVER_URL;

export const getKeywords = async (query) => {
    try{
        let keywords = [];
        const res = await fetch(`${serverUrl}/api/keywords/search?query=${query}`)
        const data = await res.json();
        keywords = Array.isArray(data?.results) && data?.results;
        return keywords;
    }catch(e){
        console.log('error occurred: ',e.message);
        return null;
    }
}