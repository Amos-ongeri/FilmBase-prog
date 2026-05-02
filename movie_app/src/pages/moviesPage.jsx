import { useEffect,useRef,useState } from "react";
import MovieCard1 from "../components/cards/MovieCard1";
import CardSkeleton from "@/components/skeletons/cardSkeleton";
import Pagination from '@mui/material/Pagination';
import MovieCard from "@/components/cards/MovieCard";
import { getGenres, getMovies } from "@/services/api";
import { cn } from "@/lib/utils";


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

    const GENRES = ["Sci-Fi", "Drama", "Thriller", "Adventure", "Mystery", "Action"];
    const PLATFORMS = ["Netflix", "Prime Video", "Disney+", "Apple TV+", "Max", "Hulu"];

    const topRef = useRef();

    useEffect(() => {
        topRef?.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    },[])


    return(
        <div ref={topRef} className="w-full min-h-50 text-gray-300">
            <section className="px-6 md:px-12 mt-16 mb-24">
        <div className="flex items-end justify-between mb-6 flex-wrap gap-4">
          <h2 className="text-2xl md:text-3xl font-bold">Browse Movies</h2>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Sort:</span>
            {(["now_playing", "upcoming", "top_rated", "popular"]).map((s) => (
              <button
                key={s}

                className={cn(
                  "glass rounded-full px-3.5 py-1.5 transition",

                )}
              >
                {s === "now_playing" ? "Now Playing" : s === "upcoming" ? "Upcoming" : s === "top_rated" ? "Top Rated" : "Popular"}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3 mb-8">
          <div className="flex gap-2 flex-wrap">
            {["All", ...GENRES].map((g) => (
              <button
                key={g}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm border transition",
                )}
              >
                {g}
              </button>
            ))}
          </div>
          <div className="flex gap-2 flex-wrap">
            {["All", ...PLATFORMS].map((p) => (
              <button
                key={p}
                className={cn(
                  "rounded-full px-3 py-1 text-xs border transition",

                )}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </section>
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