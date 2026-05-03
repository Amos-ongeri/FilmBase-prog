const movieMap = new Map();
const categories = ['now_playing','popular','top_rated','upcoming'];
const getMovies = async () => {
const results = [];
    let moviesData;
    for(const cat of categories){
        if(movieMap.has(cat))
            results.push({category: cat, movies: movieMap.get(cat)});
        else{
            await fetch(`http://localhost:5000/api/${"movie"}/${cat}/list`)
            .then(res => res.json())
            .then(data => {
                if(Array.isArray(data.results)){
                moviesData = data.results.map(item=>({
                    ...item,
                    media_type: "movie"
                }))
            }else if(typeof data.results === 'object'){
                moviesData = {
                    ...data.results,
                    media_type: "movie"
                }
            }
            })
            .catch(e => {throw new Error("error: ", e.message);
            })
            movieMap.set(cat, moviesData);
            results.push({ category: cat, movies: moviesData})
        }
    }
    return results;
}

const tvMap = new Map();
const tvCategories = ['airing_today','popular','top_rated','on_the_air'];
const getTv = async () => {
const results = [];
    let tvData;
    for(const cat of tvCategories){
        if(tvMap.has(cat))
            results.push({category: cat, tv: tvMap.get(cat)});
        else{
        await fetch(`http://localhost:5000/api/${"tv"}/${cat}/list`)
        .then(res => res.json())
        .then(data => {
            if(Array.isArray(data.results)){
                tvData = data.results.map(item=>({
                    ...item,
                    media_type: "tv"
                }))
            }else if(typeof data.results === 'object'){
                tvData = {
                    ...data.results,
                    media_type: "tv"
                }
            }
        })
        .catch(e => {throw new Error("error: ", e.message);})
            tvMap.set(cat, tvData);
            results.push({ category: cat, tv: tvData})
        }
    }
    return results;
}

const dataMap = new Map();
const getDiscover = async () => {
    const types = {
        t1: 'movie',
        t2: 'tv'
    }
    let results = {}
    try{
        if(dataMap.has('movie') && dataMap.has('tv')){
            results["movies"] = dataMap.get('movie');
            results["tv"] = dataMap.get('tv');
            return results;
        }else{
            const [movie, tv] = await Promise.all([
                fetch(`http://localhost:5000/api/discover/${types.t1}`),
                fetch(`http://localhost:5000/api/discover/${types.t2}`)
            ])

            const movies = await movie.json()
            console.log("M", movies);
            

            const movieWithType = Array.isArray(movies?.results) ? movies?.results?.map(m=>({
                ...m,
                media_type: 'movie'
            })) : movie?.results === "Object" && {...movies, media_type: "movie"}
            const Tv = await tv.json()
            const tvWithType = Array.isArray(Tv?.results) ? Tv?.results?.map(t=>({
                ...t,
                media_type: 'tv'
            })) : Tv?.results === "Object" && {...tv, media_type: "tv"}

        dataMap.set('movie', movies.results)
        dataMap.set('tv', Tv.results)
        results = {'movies': movieWithType, 'tv': tvWithType}
        return results;
        }
    }catch(e){
        console.log('error occurred: ', e.message);
    }
}

const getDetails = () => {

}

const genresMap = new Map();
const getGenres = async ()=>{
    const types = {
        t1: 'movie',
        t2: 'tv'
    }
    try{
        let results;
        if(genresMap.has('genres')){
            results = genresMap.get('genres');
            return results;
        }else{
            const [ movies, tv ] = await Promise.all([
                    fetch(`http://localhost:5000/api/${types.t1}/genres`),
                    fetch(`http://localhost:5000/api/${types.t2}/genres`)
            ])
            const moviesData = await movies.json();

            const tvData = await tv.json();
            genresMap.set('genres', [...moviesData.genres, ...tvData.genres])
            results =[...moviesData.genres, ...tvData.genres];
            return results
        }
    }catch(e){
        console.log('error: ',e.message);

    }
}

const trendingMap = new Map();
const getTrending = async (media_type, time_window) => {
    let results = {}
    try{
        if(dataMap.has('trending')){
            results["trending"] = trendingMap.get('trending');
            return results;
        }else{
            await fetch(`http://localhost:5000/api/${media_type}/${time_window}/trending`)
            .then(res => res.json())
            .then(data => {
                trendingMap.set('trending', data.results)
                results["trending"] = data.results;
            })
            .catch(e => {throw new Error("error: ", e.message);
            })
        }
    }catch(e){
        console.log('error occurred: ', e.message);
    }
    return results;
}

const getKeywords = async (query) => {
    try{
        let results = [];
        const res = await fetch(`http://localhost:5000/api/keywords/search?query=${query}`)
        const data = await res.json();
        results = Array.isArray(data?.results) && data?.results;
        return results;
    }catch(e){
        console.log('error occurred: ',e.message);
        return null;
    }
}

const searchResultsMap = new Map()
const getSearchData = async (queryParam) => {
    let results = [];
    if(searchResultsMap.has(queryParam)){
        results = searchResultsMap.get(queryParam);
        return results;
    }else{
        try{
            const res = await fetch(`http://localhost:5000/api/query/search/multi?query=${queryParam}`)
            const data = await res.json();
            console.log(data);
            searchResultsMap.set('search', data.results)
            results = data.results;
            return results;
        }catch(e){
            console.log('error occurred: ', e.message);
        }
    }
}

export {getDetails, getDiscover, getMovies, getTv, getGenres, getTrending, getKeywords, getSearchData}