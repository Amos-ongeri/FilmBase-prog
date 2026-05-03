import { useEffect,useRef,useState } from "react";
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
    const [genre, setGenre] = useState("All");
    const [category, setCategory] = useState("All");
    const [platform, setPlatform] = useState("All");
    
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

    const allMovies = [...(movies?.["upcoming"] || []),...(movies?.["top_rated"] || []),...(movies?.["popular"] || []),...(movies?.["now_playing"] || [])];

    const GENRES = ["Science Fiction", "Drama", "Thriller", "Adventure", "Mystery", "Action"];
    const PLATFORMS = ["Netflix", "Prime Video", "Disney+", "Apple TV+", "Max", "Hulu"];

    const topRef = useRef();

    useEffect(() => {
        topRef?.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    },[])


    return(
        <div ref={topRef} className="w-full min-h-50 text-gray-300 bg-background">
            <section className="px-6 md:px-12 mt-16 mb-24">
        <div className="flex items-end justify-between mb-6 flex-wrap gap-4">
          <h2 className="text-2xl md:text-3xl font-bold">Browse Movies</h2>
          <div className="flex flex-wrap gap-2 text-sm">
            {/* <span className="text-muted-foreground">Sort:</span> */}
            <span onClick={() => setCategory("All")} className={`rounded-full px-3.5 py-1.5 transition hover:-translate-y-1 ${category === "All" ? "bg-primary" : "glass"}`}>All</span>
            {(["now_playing", "upcoming", "top_rated", "popular"]).map((s) => (
              <button
                key={s}
                onClick={() => setCategory(s)}
                className={`rounded-full px-3.5 py-1.5 transition hover:-translate-y-1  ${s === category ? "bg-primary" : "glass"}`}
              >
                {s === "now_playing" ? "Now Playing" : s === "upcoming" ? "Upcoming" : s === "top_rated" ? "Top Rated" : "Popular"}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3 mb-8">
          <div className="flex gap-2 flex-wrap">
            {["All", ...[...new Set((genres?.map(gen => gen?.name)) || [])]].map((g) => (
              <button
                key={g}
                onClick={() => setGenre(g)}
                className={`rounded-full px-4 py-1.5 text-sm border transition ${g === genre && "bg-primary"}`}
              >
                {g}
              </button>
            ))}
          </div>
          <div className="flex gap-2 flex-wrap">
            {["All", ...PLATFORMS].map((p) => (
              <button
                key={p}
                onClick={() => setPlatform(p)}
                className={`rounded-full px-3 py-1 text-xs border transition ${p === platform && "bg-primary"}`}
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
                  <div className="grid lg:grid-cols-6 grid-cols-2 space-y-5">
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
      <footer className="border-t border-border py-8 px-6 md:px-12 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} FilmBase · Built for cinema.
      </footer>
    </div>
  )
}

export default Movies;