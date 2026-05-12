const serverUrl = import.meta.env.VITE_SERVER_URL;

const movieMap = new Map();
const categories = ['now_playing','popular','top_rated','upcoming'];
const getMovies = async (page) => {
const movies = {};
    let moviesData;
    for(const cat of categories){
        if(movieMap.has(`${cat}:${page}`))
            movies[cat] = movieMap.get(`${cat}:${page}`);
        else{
            const res = await fetch(`${serverUrl}/api/${"movie"}/${cat}/${page}/list`)
            moviesData = await res.json()
            movieMap.set(`${cat}:${page}`, moviesData);
            movies[cat] =  moviesData;
        }
    }
    return movies;
}

const categoryMovie = new Map();
const getCategoryMovies = async (category,page) => {
    let categoryMovies = {};

        if(categoryMovie.has(`${category}:${page}`)){
            categoryMovies = categoryMovie.get(`${category}:${page}`);
        }else{
            const res = await fetch(`${serverUrl}/api/${"movie"}/${category}/${page}/list`);
            const films = await res.json();
            categoryMovie.set(`${category}:${page}`, films);
            categoryMovies =  films;
        }
    return categoryMovies;
}

const tvMap = new Map();
const tvCategories = ['airing_today','popular','top_rated','on_the_air'];
const getTv = async (page) => {
    const tv = {};

    for(const cat of tvCategories){
        if(tvMap.has(`cat:${page}`)){
            tv[cat] = tvMap.get(`${cat}:${page}`);
        }else{
            const res = await fetch(`${serverUrl}/api/${"tv"}/${cat}/${page}/list`)
            const tvFilms = await res.json();

            tvMap.set(`${cat}:${page}`, tvFilms);

            tv[cat] = tvFilms;

        }
    }
    return tv;
}

const categoryTv = new Map();
const getCategoryTv = async (category,page) => {
    let categoryTvs = {};

        if(categoryTv.has(`${category}:${page}`)){
            categoryTvs = categoryTv.get(`${category}:${page}`);
        }else{
            const res = await fetch(`${serverUrl}/api/${"tv"}/${category}/${page}/list`);
            const films = await res.json();
            categoryTv.set(`${category}:${page}`, films);
            categoryTvs =  films;
        }
    return categoryTvs;
}

const discoverMap = new Map();
const getDiscover = async (page) => {
    const types = {
        t1: 'movie',
        t2: 'tv'
    }
    let discoverData = {}
    try{
        if(discoverMap.has(`movie:${page}`) && discoverMap.has(`tv:${page}`)){
            discoverData["movies"] = discoverMap.get(`movie:${page}`);
            discoverData["tv"] = discoverMap.get(`tv:${page}`);
        }else{
            const [movie, tv] = await Promise.all([
                fetch(`${serverUrl}/api/discover/${types.t1}/${page}`),
                fetch(`${serverUrl}/api/discover/${types.t2}/${page}`)
            ])

            const movies = await movie.json()

            const Tv = await tv.json()

        discoverMap.set(`movie:${page}`, movies)
        discoverMap.set(`tv:${page}`, Tv)
        discoverData['movies'] = movies;
        discoverData['tv'] = Tv;
        }

        return discoverData;

    }catch(e){
        console.log('error occurred: ', e.message);
    }
}
const typeMap = new Map();
const getTypeDiscover = async (type,page) => {
    let discoverData = {}
    try{
        if(typeMap.has(`movie:${page}`) && typeMap.has(`tv:${page}`)){
            discoverData = typeMap.get(`${type}:${page}`);
        }else{
            const res = await fetch(`${serverUrl}/api/discover/${type}/${page}`);

            const movies = await res.json()

            typeMap.set(`movie:${page}`, movies)
            discoverData = movies;
        }
        console.log("types", discoverData);
        

        return discoverData;

    }catch(e){
        console.log('error occurred: ', e.message);
    }
}

const detailsMap = new Map();
const getDetails = async (tmdb_id, media_type) => {
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

const movieGenres = new Map();
const getMovieGenres = async ()=>{
    try{
        let genresForMovies;
        if(movieGenres.has('genres')){
            genresForMovies = movieGenres.get('genres');
            return genresForMovies;
        }else{
            const genres = await fetch(`${serverUrl}/api/movie/genres`);
            const data = await genres.json();

            movieGenres.set('genres', data?.genres);
            genresForMovies =[data?.genres];

            return genresForMovies?.[0];
        }
    }catch(e){
        console.log('error: ',e.message);
    }
}

const tvGenres = new Map();
const getTvGenres = async ()=>{
    try{
        let genresForTv;
        if(tvGenres.has('genres')){
            genresForTv = tvGenres.get('genres');
            return genresForTv;
        }else{
            const genres = await fetch(`${serverUrl}/api/tv/genres`);
            const data = await genres.json();

            tvGenres.set('genres', data?.genres);
            genresForTv =[data?.genres];
            return genresForTv?.[0];
        }
    }catch(e){
        console.log('error: ',e.message);
    }
}

const genresMap = new Map();
const getGenres = async ()=>{
    const types = {
        t1: 'movie',
        t2: 'tv'
    }
    try{
        let allGenres;
        if(genresMap.has('genres')){
            allGenres = genresMap.get('genres');
            return allGenres;
        }else{
            const [ movies, tv ] = await Promise.all([
                    fetch(`${serverUrl}/api/${types.t1}/genres`),
                    fetch(`${serverUrl}/api/${types.t2}/genres`)
            ])
            const moviesData = await movies.json();

            const tvData = await tv.json();
            genresMap.set('genres', [...moviesData.genres, ...tvData.genres])
            allGenres =[...moviesData.genres, ...tvData.genres];

            return allGenres;
        }
    }catch(e){
        console.log('error: ',e.message);

    }
}

const trendingMap = new Map();
const getTrending = async (media_type, time_window) => {
    let trending = {}
    try{
        if(trendingMap.has('trending')){
            trending["trending"] = trendingMap.get('trending');
            return trending["trending"];
        }else{
            await fetch(`${serverUrl}/api/${media_type}/${time_window}/trending`)
            .then(res => res.json())
            .then(data => {
                trendingMap.set('trending', data.results)
                trending["trending"] = data.results;
            })
            .catch(e => {throw new Error("error: ", e.message);
            })
        }
    }catch(e){
        console.log('error occurred: ', e.message);
    }
    return trending["trending"];
}

const getKeywords = async (query) => {
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

const searchResultsMap = new Map()
const getSearchData = async (queryParam, page) => {
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

const videosMap = new Map();
const getVideos = async (tmdb_id, media_type) => {
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

const creditsMap = new Map();
const getCredits = async (tmdb_id, media_type)=>{
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

const similarMap = new Map();
const getSimilar = async (tmdb_id, media_type)=>{
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

const reviewsMap = new Map();
const getReviews = async (tmdb_id, media_type)=>{
    let reviews = null;
    try{
        if(reviewsMap.has(tmdb_id)){
            reviews = reviewsMap.get(tmdb_id);
            return reviews;
        }else{
            const revius = await fetch(`${serverUrl}/api/${tmdb_id}/${media_type}/reviews`)
            const reviewsData = await revius.json();
            reviewsMap.set(tmdb_id,reviewsData);
            reviews = reviewsData.results;

            return reviews;
        }
    }catch(e){
        console.log('error occurred: ',e.message);
    }
}

const imagesMap = new Map();
const getImages = async (media_type, id) => {
    let imagesData;
    if(imagesMap.has("images")){
        imagesData = imagesMap.get("images");
    } else {
        const res = await fetch(`${serverUrl}/api/${media_type}/${id}/images`);

        const images = await res.json();

        imagesMap.set("images", images);

        imagesData = images
    }

    return imagesData;
}

export {
    getDetails, getDiscover, getMovies,
    getTv, getGenres, getTrending,
    getKeywords, getSearchData, getMovieGenres,
    getTvGenres, getVideos, getCredits,
    getSimilar, getReviews, getCategoryMovies,
    getCategoryTv, getTypeDiscover,
    getImages
}