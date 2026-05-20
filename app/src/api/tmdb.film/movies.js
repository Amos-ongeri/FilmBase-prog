// const serverUrl = import.meta.env.VITE_SERVER_URL;
const serverUrl = 'http://localhost:5000'

const movieMap = new Map();
const categoryMovie = new Map();

const categories = ['now_playing','popular','top_rated','upcoming'];
export const getMovies = async (page = 1) => {
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

export const getCategoryMovies = async (category,page = 1) => {
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