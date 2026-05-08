import { useEffect,useRef,useState } from "react";
import CardSkeleton from "@/components/placeholders/cardSkeleton";
import MovieCard from "@/components/cards/MovieCard";
import { getMovieGenres, getMovies, getNowPlayingMovies, getPopularMovies, getTopRatedMovies, getUpcomingMovies } from "@/services/api";
import { SmartPagination } from "@/components/smartPagination";

const Movies = ()=>{
  const [movies, setMovies] = useState({})
  const [upcomingMovies, setUpcomingMovies] = useState({})
  const [topRatedMovies, setTopRatedMovies] = useState({})
  const [nowPlayingmovies, setNowPlayingMovies] = useState({})
  const [popularMovies, setPopularMovies] = useState({})
  const [genres, setGenres] = useState();
  const [genre, setGenre] = useState("All");
  const [category, setCategory] = useState("All");
  const [platform, setPlatform] = useState("All");
  const [pageAll, setPageAll] = useState(1);
  const [upcomingPage, setUpcomingPage] = useState(1)
  const [topRatedPage, setTopRatedPage]= useState(1);
  const [nowPlayingPage, setNowPlayingPage] = useState(1);
  const [popularPage, setPopularPage] = useState(1);
  console.log("movies", movies);

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
      const ms = await getUpcomingMovies(upcomingPage);
      setUpcomingMovies(ms)
    }
    initUpcoming();
  },[upcomingPage])

  useEffect(() => {
    const initTopRated = async () => {
      const ms = await getTopRatedMovies(topRatedPage);
      setTopRatedMovies(ms)
    }
    initTopRated();
  },[topRatedPage])

  useEffect(() => {
    const initNowPlaying = async () => {
      const ms = await getNowPlayingMovies(nowPlayingPage);
      setNowPlayingMovies(ms)
    }
    initNowPlaying();
  },[nowPlayingPage])

  useEffect(()=> {
    const initPopular = async () => {
      const ms = await getPopularMovies(popularPage);
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
              (genre !== "All" ? (
                <div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                    {allMovies?.map((movie,i)=> {
                        let m = {...movie, media_type: "movie"}
                        const gen = genres?.find(g => g?.name === genre)

                        if(movie?.genre_ids?.includes(gen?.id)){
                          return <MovieCard key={i} movie={m} genre={genres} index={i}/>
                        }
                    })}
                  </div>
                  <br />
                    <SmartPagination currentPage={pageAll}
                    totalPages={movies["now_playing"].total_pages + movies["popular"].total_pages + movies["top_rated"].total_pages + movies["upcoming"].total_pages}
                    onPageChange={setPageAll}/>
                  <br />
                </div>
              ) : (
                <div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                      {allMovies?.map((movie,i)=> {
                          let m = {...movie, media_type: "movie"}
                          return <MovieCard key={i} movie={m} genre={genres} index={i}/>
                      })}
                    </div>
                    <br />
                    <SmartPagination currentPage={pageAll}
                      totalPages={movies["now_playing"].total_pages + movies["popular"].total_pages + movies["top_rated"].total_pages + movies["upcoming"].total_pages}
                      onPageChange={setPageAll}/>
                    <br />
                </div>
              ))
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
          (genre !== "All" ? (
            <div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {topRatedMovies?.results?.map((movie,i)=> {
                  let m = {...movie, media_type: "movie"}
                  const gen = genres?.find(g => g?.name === genre)

                  if(movie?.genre_ids?.includes(gen?.id)){
                    return <MovieCard key={i} movie={m} genre={genres} index={i}/>
                  }
              })}
              </div>
              <br />
              <SmartPagination currentPage={topRatedPage}
                  totalPages={topRatedMovies?.total_pages}
                  onPageChange={setTopRatedPage}/>
              <br />
            </div>
          ) : (
            <div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {topRatedMovies?.results?.map((movie,i)=> {
                  let m = {...movie, media_type: "movie"}
                  return <MovieCard key={i} movie={m} genre={genres} index={i}/>
              })}
              </div>
              <br />
              <SmartPagination currentPage={topRatedPage}
                  totalPages={topRatedMovies?.total_pages}
                  onPageChange={setTopRatedPage}/>
              <br />
            </div>
          ))
        )}
        {upcomingMovies && category === "upcoming" && (
          (genre !== "All" ? (
            <div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {upcomingMovies?.results?.map((movie,i)=> {
                  let m = {...movie, media_type: "movie"}
                  const gen = genres?.find(g => g?.name === genre)

                  if(movie?.genre_ids?.includes(gen?.id)){
                    return <MovieCard key={i} movie={m} genre={genres} index={i}/>
                  }
              })}
              </div>
              <br />
              <SmartPagination currentPage={upcomingPage}
                totalPages={upcomingMovies?.total_pages}
                  onPageChange={setUpcomingPage}/>
              <br />
            </div>
          ) : (
            <div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {upcomingMovies?.results?.map((movie,i)=> {
                  let m = {...movie, media_type: "movie"}
                  return <MovieCard key={i} movie={m} genre={genres} index={i}/>
              })}
              </div>
              <br />
              <SmartPagination currentPage={upcomingPage}
                totalPages={upcomingMovies?.total_pages}
                  onPageChange={setUpcomingPage}/>
              <br />
            </div>
          ))
        )}
        {popularMovies && category === "popular" && (
          (genre !== "All" ? (
            <div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {popularMovies?.results?.map((movie,i)=> {
                  let m = {...movie, media_type: "movie"}
                  const gen = genres?.find(g => g?.name === genre)

                  if(movie?.genre_ids?.includes(gen?.id)){
                    return <MovieCard key={i} movie={m} genre={genres} index={i}/>
                  }
              })}
              </div>
              <br />
              <SmartPagination currentPage={popularPage}
                totalPages={popularMovies?.total_pages}
                  onPageChange={setPopularPage}/>
              <br />
            </div>
          ) : (
            <div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {popularMovies?.results?.map((movie,i)=> {
                  let m = {...movie, media_type: "movie"}
                  return <MovieCard key={i} movie={m} genre={genres} index={i}/>
              })}
              </div>
              <br />
              <SmartPagination currentPage={popularPage}
                totalPages={popularMovies?.total_pages}
                  onPageChange={setPopularPage}/>
              <br />
            </div>
          ))
        )}
        {nowPlayingmovies && category === "now_playing" && (
          (genre !== "All" ? (
            <div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {nowPlayingmovies?.results?.map((movie,i)=> {
                  let m = {...movie, media_type: "movie"}
                  const gen = genres?.find(g => g?.name === genre)

                  if(movie?.genre_ids?.includes(gen?.id)){
                    return <MovieCard key={i} movie={m} genre={genres} index={i}/>
                  }
              })}
              </div>
              <br />
              <SmartPagination currentPage={nowPlayingPage}
                totalPages={nowPlayingmovies?.total_pages}
                  onPageChange={setNowPlayingPage}/>
              <br />
            </div>
          ) : (
            <div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {nowPlayingmovies?.results?.map((movie,i)=> {
                  let m = {...movie, media_type: "movie"}
                  return <MovieCard key={i} movie={m} genre={genres} index={i}/>
              })}
              </div>
              <br />
              <SmartPagination currentPage={nowPlayingPage}
                totalPages={nowPlayingmovies?.total_pages}
                  onPageChange={setNowPlayingPage}/>
              <br />
            </div>
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