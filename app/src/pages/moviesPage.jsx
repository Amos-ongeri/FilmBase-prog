import { useEffect,useRef,useState } from "react";
import CardSkeleton from "@/components/placeholders/cardSkeleton";
import { getCategoryMovies, getMovieGenres, getMovies } from "@/services/api";
import FilmSection from "@/components/filmSection";
import { useSearchParams } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";

const Movies = ()=>{
  const [movies, setMovies] = useState({})
  const [genres, setGenres] = useState([]);
  const [platform, setPlatform] = useState("All");

  const [searchParam, setSearchParam] = useSearchParams();

  const category = searchParam.get('category') ?? "All";
  const page = Number(searchParam.get('page') ?? 1);
  const genre = searchParam.get('genre') ?? "All";

  const updateParam = (key, value) => {
    const params = new URLSearchParams(searchParam);

    params.set(key, value)

    setSearchParam(params)
  }
  const changeCategory = (cat) => {
    setSearchParam((prev) => {
      const params = new URLSearchParams(prev);
      params.set("category", cat);
      params.set("page", 1);
      params.set("genre", "All");

      return params;
    });
  };

  useEffect(() => {
    const initMovieGenres = async () => {
      const gen = await getMovieGenres();
      setGenres(gen);
    }
    initMovieGenres()
  },[])

  useEffect(() => {
    const getData = async () => {
      let data;

      if(category === "All"){
        data = await getMovies(page);
      } else {
        data = await getCategoryMovies(category,page)
      }

      setMovies(data);
    }
    getData()
  },[category,page])

  //handy learn more
  const hasMovies = [
    movies?.now_playing?.results,
    movies?.popular?.results,
    movies?.top_rated?.results,
    movies?.upcoming?.results
  ].every(section => section?.length > 0 && section !== undefined);

  const allMovies = category === "All" && [...(movies?.["upcoming"]?.results || []),...(movies?.["top_rated"]?.results || []),...(movies?.["popular"]?.results || []),...(movies?.["now_playing"]?.results || [])];

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
            <span onClick={() => updateParam('category',"All")} className={`rounded-full px-3.5 py-1.5 transition hover:-translate-y-1 ${category === "All" ? "bg-primary" : "glass"}`}>All</span>
            {(["now_playing", "upcoming", "top_rated", "popular"]).map((s) => (
              <button
                key={s}
                onClick={() => changeCategory(s)}
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
                onClick={() => updateParam("genre",g)}
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
        {hasMovies && (
          <>
            { category === "All" && (
              (!movies ? (<Spinner />) : (
                <FilmSection films={allMovies} type={"movie"} genre={genre} genres={genres} page={page} total={movies["now_playing"].total_pages + movies["popular"].total_pages + movies["top_rated"].total_pages + movies["upcoming"].total_pages} setPage={(p) => updateParam('page', p)}/>
              ))
            )}
        </>
        )}
        {movies && category === "top_rated" && (
          (!movies ? (<Spinner />) : (
            <FilmSection films={movies.results} type={"movie"} genre={genre} genres={genres} page={page} total={movies?.total_pages} setPage={(p) => updateParam('page', p)} />
          ))
        )}
        {movies && category === "upcoming" && (
          (!movies ? (<Spinner />) : (
            <FilmSection films={movies.results} type={"movie"} genre={genre} genres={genres} page={page} total={movies?.total_pages} setPage={(p) => updateParam('page', p)} />
          ))
        )}
        {movies && category === "popular" && (
          (!movies ? (<Spinner />) : (
            <FilmSection films={movies.results} type={"movie"} genre={genre} genres={genres} page={page} total={movies?.total_pages} setPage={(p) => updateParam('page', p)} />
          ))
        )}
        {movies && category === "now_playing" && (
          (!movies ? (<Spinner />) : (
            <FilmSection films={movies.results} type={"movie"} genre={genre} genres={genres} page={page} total={movies?.total_pages} setPage={(p) => updateParam('page', p)} />
          ))
        )}
      </div>

      <footer className="border-t border-muted/50 dark:border-border py-8 px-6 mt-5 md:px-12 text-center text-xs dark:text-muted-foreground">
        © {new Date().getFullYear()} FilmBase · Built for cinema.
      </footer>
    </div>
  )
}

export default Movies;