// const serverUrl = import.meta.env.VITE_SERVER_URL;
const serverUrl = 'http://localhost:5000'

const genresMap = new Map();
const tvGenres = new Map();
const movieGenres = new Map();

export const getGenres = async ()=>{
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

export const getTvGenres = async ()=>{
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

export const getMovieGenres = async ()=>{
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