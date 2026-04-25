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

const getDiscover = () => {

}

const getDetails = () => {

}

export {getDetails, getDiscover, getMovies, getTv}