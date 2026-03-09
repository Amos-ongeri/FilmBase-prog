import { useEffect,useState } from "react";
import axios from "axios";
import MovieCard from "../components/Cards/MovieCard";

const movieMap = new Map();
const categories = ['now_playing','popular','top_rated','upcoming'];

const Movies = ()=>{
    const [movies, setMovies] = useState({
            popular: [],
            top_rated: [],
            upcoming: [],
            now_playing: []
        })
    const media_type = 'movie';
    
    useEffect(()=> {
        const fetchMovies = async ()=>{
            const results = [];
            let moviesData;
            for(const cat of categories){
                if(movieMap.has(cat))
                    results.push({category: cat, movies: movieMap.get(cat)});
                else{
                const { data } = await axios.get(`http://localhost:5000/api/${media_type}/${cat}/list`)
                    if(Array.isArray(data.results)){
                        moviesData = data.results.map(item=>({
                            ...item,
                            media_type: media_type
                        }))
                    }else if(typeof data.results === 'object'){
                        moviesData = {
                            ...data.results,
                            media_type: media_type
                        }
                    }
                    movieMap.set(cat, moviesData);
                    results.push({ category: cat, movies: moviesData})
                }
            }
    
            setMovies(prev=> {
                const newState = {...prev};
                results.forEach(r=> newState[r.category] = r.movies);
                return newState;
            })
        }
        
        fetchMovies()  
    },[])
    useEffect(() => {
      console.log("Movies updated:", movies);
    }, [movies]);

    return(
        <div className="w-[95%] min-h-full text-gray-300">
            {movies && (
                <>
                <div className="min-h-0 min-w-full px-10 ">
                <p className="text-white text-2xl">&#128293;upcoming</p>
                <br />
                <div className="grid grid-cols-5 space-y-5">
                {
                    movies['upcoming']?.map((movie,i)=>(
                        <MovieCard Key={i} data={movie}/>
                    ))
                }
                </div>
            </div>
            <div className="min-h-0 min-w-full px-10 ">
                <p className="text-white text-2xl">&#128293;now playing</p>
                <br />
                <div className="grid grid-cols-5 space-y-5">
                {
                    movies['now_playing']?.map((movie,i)=>(
                        <MovieCard Key={i} data={movie}/>
                    ))
                }
                </div>
            </div>
            <br />
            <div className="min-h-0 min-w-full px-10">
                <p className="text-white text-2xl">&#128293;Popular</p>
                <br />
                <div className="grid grid-cols-5 space-y-2">
                {
                    movies['popular']?.map((movie,i)=>(
                        <MovieCard Key={i} data={movie}/>
                    ))
                }
                </div>
            </div>
            <br />
            <div className="min-h-0 min-w-full px-10">
                <p className="text-white text-2xl">&#128293;top rated</p>
                <br />
                <div className="grid grid-cols-5 grid-rows-2 space-y-2 ">
                {
                    movies['top_rated']?.map((movie,i)=>(
                        <MovieCard Key={i} data={movie}/>
                    ))
                }
                </div>
            </div>
            </>
            )}
        </div>
    )
}

export default Movies;