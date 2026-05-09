import { useEffect,useRef,useState } from "react";
import CardSkeleton from "@/components/placeholders/cardSkeleton";
import { getCategoryMovies, getMovieGenres, getMovies } from "@/services/api";
import FilmSection from "@/components/filmSection";

const Movies = ()=>{
  const [movies, setMovies] = useState({})
  const [upcomingMovies, setUpcomingMovies] = useState({})
  const [topRatedMovies, setTopRatedMovies] = useState({})
  const [nowPlayingMovies, setNowPlayingMovies] = useState({})
  const [popularMovies, setPopularMovies] = useState({})
  const [genres, setGenres] = useState([]);
  const [genre, setGenre] = useState("All");
  const [category, setCategory] = useState("All");
  const [platform, setPlatform] = useState("All");
  const [pageAll, setPageAll] = useState(1);
  const [upcomingPage, setUpcomingPage] = useState(1)
  const [topRatedPage, setTopRatedPage]= useState(1);
  const [nowPlayingPage, setNowPlayingPage] = useState(1);
  const [popularPage, setPopularPage] = useState(1);

  useEffect(() => {
    const initMovieGenres = async () => {
      const gen = await getMovieGenres();
      setGenres(gen);
    }
    initMovieGenres()
  },[])

  useEffect(() => {
    const initMovies = async () => {
      const ms = await getMovies(pageAll);
      setMovies(ms)
    }
    initMovies();
  },[pageAll])

  useEffect(() => {
    const initUpcoming = async () => {
      const ms = await getCategoryMovies("upcoming",upcomingPage);
      setUpcomingMovies(ms)
    }
    initUpcoming();
  },[upcomingPage])

  useEffect(() => {
    const initTopRated = async () => {
      const ms = await getCategoryMovies("top_rated",topRatedPage);
      setTopRatedMovies(ms)
    }
    initTopRated();
  },[topRatedPage])

  useEffect(() => {
    const initNowPlaying = async () => {
      const ms = await getCategoryMovies("now_playing",nowPlayingPage);
      setNowPlayingMovies(ms)
    }
    initNowPlaying();
  },[nowPlayingPage])

  useEffect(()=> {
    const initPopular = async () => {
      const ms = await getCategoryMovies("popular",popularPage);
      setPopularMovies(ms)
    }
    initPopular();
  },[popularPage])

  console.log("popular", popularMovies);


  //handy learn more
  const hasMovies = [
    movies?.now_playing?.results,
    movies?.popular?.results,
    movies?.top_rated?.results,
    movies?.upcoming?.results
  ].every(section => section?.length > 0 && section !== undefined);

  const allMovies = [...(movies?.["upcoming"]?.results || []),...(movies?.["top_rated"]?.results || []),...(movies?.["popular"]?.results || []),...(movies?.["now_playing"]?.results || [])];

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
      <div className="min-h-0 min-w-full px-2 md:px-12">
        {hasMovies ? (
          <>
            { category === "All" && (
              <FilmSection films={allMovies} type={"movie"} genre={genre} genres={genres} page={pageAll} total={movies["now_playing"].total_pages + movies["popular"].total_pages + movies["top_rated"].total_pages + movies["upcoming"].total_pages} setPage={setPageAll}/>
            )}
          </>
        ) : (
          <div className="grid grid-cols-5 place-items-center pt-5">
            {Array.from({length:5}).map((_,i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        )}
        {topRatedMovies && category === "top_rated" && (
          <FilmSection films={topRatedMovies.results} type={"movie"} genre={genre} genres={genres} page={topRatedPage} total={topRatedMovies?.total_pages} setPage={setTopRatedPage} />
        )}
        {upcomingMovies && category === "upcoming" && (
          <FilmSection films={upcomingMovies.results} type={"movie"} genre={genre} genres={genres} page={upcomingPage} total={upcomingMovies?.total_pages} setPage={setUpcomingPage} />
        )}
        {popularMovies && category === "popular" && (
          <FilmSection films={popularMovies.results} type={"movie"} genre={genre} genres={genres} page={popularPage} total={popularMovies?.total_pages} setPage={setPopularPage} />
        )}
        {nowPlayingMovies && category === "now_playing" && (
          <FilmSection films={nowPlayingMovies.results} type={"movie"} genre={genre} genres={genres} page={nowPlayingPage} total={nowPlayingMovies?.total_pages} setPage={setNowPlayingPage} />
        )}
      </div>

      <footer className="border-t border-muted/50 dark:border-border py-8 px-6 mt-5 md:px-12 text-center text-xs dark:text-muted-foreground">
        © {new Date().getFullYear()} FilmBase · Built for cinema.
      </footer>
    </div>
  )
}

export default Movies;