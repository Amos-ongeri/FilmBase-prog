import { useEffect,useState } from "react";
import MovieCard1 from "../components/cards/MovieCard1";
import CardSkeleton from "@/components/skeletons/cardSkeleton";
import Pagination from '@mui/material/Pagination';
import MovieCard from "@/components/cards/MovieCard";
import { getGenres, getMovies } from "@/services/api";


const Movies = ()=>{
    const [movies, setMovies] = useState({
            popular: [],
            top_rated: [],
            upcoming: [],
            now_playing: []
        })
    const [genres, setGenres] = useState();
    
    useEffect(()=> {

        const initMovies = async () => {
            const ms = await getMovies();
            setMovies(prev=> {
                const newState = {...prev};
                ms.forEach(r=> newState[r.category] = r.movies);
                return newState;
            })
        }
        initMovies()

        const initGenres = async () => {
            const gen = await getGenres();
            setGenres(gen);
        }
        initGenres()
},[])
    useEffect(() => {
      console.log("Movies updated:", movies);
    }, [movies]);
    useEffect(() => {
      console.log("genres updated:", genres);
    }, [genres]);

    //handy learn more
    const hasMovies = [
        movies?.now_playing,
        movies?.popular,
        movies?.top_rated,
        movies?.upcoming
    ].every(section => section?.length > 0 && section !== undefined);

    const allMovies = [...movies["upcoming"],...movies["top_rated"],...movies["popular"],...movies["now_playing"]];

    return(
        <div className="w-full min-h-50 text-gray-300">
            {hasMovies ? (
                <>
                    <div className="min-h-0 min-w-full px-10">
                        {/* <p className="text-white text-2xl">&#128293;upcoming</p> */}
                        <br />
                        <div className="grid lg:grid-cols-5 grid-cols-2 space-y-5">
                            {
                                allMovies?.map((movie,i)=>(
                                    // <MovieCard1 Key={i} data={movie}/>
                                    <MovieCard movie={movie} genre={genres} index={i}/>
                                ))
                            }
                        </div>
                    </div>
                </>
            ) : (
                <div className="grid grid-cols-5 place-items-center pt-5">
                    {Array.from({length:5}).map((_,i) => (
                        <CardSkeleton key={i} />
                    ))}
                </div>
            )}
            <Pagination count={10} variant="outlined" shape="rounded" />
        </div>
    )
}

export default Movies;