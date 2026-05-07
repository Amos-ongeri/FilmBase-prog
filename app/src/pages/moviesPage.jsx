import { useEffect,useRef,useState } from "react";
import CardSkeleton from "@/components/placeholders/cardSkeleton";
import MovieCard from "@/components/cards/MovieCard";
import { getMovieGenres, getMovies } from "@/services/api";


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

    const initMovies = async () => {
        const ms = await getMovies();
        setMovies(() => {
            const newState = {};
            ms.forEach(r=> newState[r.category] = r.movies);
            return newState;
        })
    }

    const initMovieGenres = async () => {
        const gen = await getMovieGenres();
        setGenres(gen);
    }
    
    useEffect(()=> {
      const loadData = async () => {
        await Promise.all([initMovies(),initMovieGenres()])
      }
      loadData()
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

    const PLATFORMS = ["Netflix", "Prime Video", "Disney+", "Apple TV+", "Max", "Hulu"];

    const topRef = useRef();

    useEffect(() => {
        topRef?.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    },[])


    return(
        <div ref={topRef} className="w-full min-h-50 text-background dark:text-gray-300 bg-foreground dark:bg-background">
            <section className="px-5 md:px-12 pt-16 mb-8">
        <div className="flex items-end justify-between mb-6 flex-wrap gap-4">
          <h2 className="text-2xl md:text-3xl font-bold">Browse Movies</h2>
          <div className="flex flex-wrap gap-2 text-sm">
            {/* <span className="text-muted-foreground">Sort:</span> */}
            <span onClick={() => setCategory("All")} className={`rounded-full px-3.5 py-1.5 transition hover:-translate-y-1 ${category === "All" ? "bg-primary" : "glass"}`}>All</span>
            {(["now_playing", "upcoming", "top_rated", "popular"]).map((s) => (
              <button
                key={s}
                onClick={() => setCategory(s)}
                className={`rounded-full px-3.5 py-1.5 transition duration-75 hover:-translate-y-1  ${s === category ? "bg-primary" : "glass"}`}
              >
                {s === "now_playing" ? "Now Playing" : s === "upcoming" ? "Upcoming" : s === "top_rated" ? "Top Rated" : "Popular"}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex gap-2 flex-wrap">
            {["All", ...(genres?.map(gen => gen?.name) || [])].map((g) => (
              <button
                key={g}
                onClick={() => setGenre(g)}
                className={`rounded-full px-4 py-1.5 text-sm transition duration-75 ${g === genre ? "bg-primary" : "border dark:border-border border-muted/50"}`}
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
                className={`rounded-full px-3 py-1 text-xs transition  ${p === platform ? "bg-primary" : "border dark:border-border border-muted/50"}`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </section>
      {hasMovies ? (
          <>
              <div className="min-h-0 min-w-full px-2">
                {genre === 'All' ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                      {
                          allMovies?.map((movie,i)=>(
                              <MovieCard movie={movie} genre={genres} index={i}/>
                          ))
                      }
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                    {
                          allMovies?.map((movie,i)=>{
                              const id = genres?.find(g => g?.name === genre);
                              if(movie?.genre_ids?.includes(id?.id)){
                                return <MovieCard movie={movie} genre={genres} index={i}/>
                              }
                          })
                      }
                  </div>
                )}
              </div>
          </>
      ) : (
          <div className="grid grid-cols-5 place-items-center pt-5">
              {Array.from({length:5}).map((_,i) => (
                  <CardSkeleton key={i} />
              ))}
          </div>
      )}
      <footer className="border-t border-muted/50 dark:border-border py-8 px-6 mt-5 md:px-12 text-center text-xs dark:text-muted-foreground">
        © {new Date().getFullYear()} FilmBase · Built for cinema.
      </footer>
    </div>
  )
}

export default Movies;