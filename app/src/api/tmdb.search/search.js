// const serverUrl = import.meta.env.VITE_SERVER_URL;
const serverUrl = 'http://localhost:5000'

const searchResultsMap = new Map()

export const getSearchData = async (queryParam, page) => {
    let searchData = [];
    if(searchResultsMap.has(`${queryParam}:${page}`)){
        searchData = searchResultsMap.get(`${queryParam}:${page}`);
        return searchData;
    }else{
        try{
            const res = await fetch(`${serverUrl}/api/query/search/multi?query=${queryParam}&page=${page}`)
            const data = await res.json();

            searchResultsMap.set(`${queryParam}:${page}`, data)
            searchData = data;

            return searchData;
        }catch(e){
            console.log('error occurred: ', e.message);
        }
    }
}