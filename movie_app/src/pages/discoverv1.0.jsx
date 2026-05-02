import MovieCard1 from "@/components/cards/MovieCard1";
import { MovieCard3 } from "@/components/cards/MovieCard3";
import { getDiscover, getGenres, getTrending } from "@/services/api";
import { Search, TrendingUp, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Discover = () => {
    const [type, setType] = useState("all");
    const [query, setQuery] = useState("");
    const [genre, setGenre] = useState("All");
    const [genres, setGenres] = useState();
    const [trending, setTrending] = useState()
    const[discover, setDiscover] = useState();
    const TRENDING_SEARCHES = ["Sci-Fi 2025", "Award winners", "Mystery series", "Top rated", "New on Netflix"];
    const GENRES = ["Science Fiction", "Drama", "Thriller", "Adventure", "Mystery", "Action"];
    const isSearching = query.length > 0 || genre !== "All" || type !== "all";

    useEffect(() => {
        const initDiscover = async () => {
            const discover = await getDiscover();
            setDiscover(discover);
        }
        const initGenres = async () => {
            const genres = await getGenres();
            setGenres(genres);
            
        }
        const initTrending = async () => {
            const trending = await getTrending("all","week");
            setTrending(trending);
            
        }
        initTrending();
        initGenres();
        initDiscover();
    },[])
    console.log("genres", genres);
    console.log("discover", discover);
    console.log("trending", trending);

    const topRef = useRef();
            
    useEffect(() => {
        topRef?.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    },[])
    
    return(
        <main ref={topRef} className="min-h-50 min-w-full text-foreground">
            <section className="px-6 md:px-12 pt-12 pb-8 max-w-4xl mx-auto">
                <h1 className="text-4xl font-extrabold text-center mb-3 md:text-6xl">Discover what to   <span className="text-gradient-orange">watch</span></h1>
                <p className="text-center text-muted-foreground mb-8">Search across thousands of movies and  series.</p>
                <div className="relative">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5     text-muted-foreground" />
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search titles, genres, actors…"
                        className="w-full glass rounded-full h-14 pl-14 pr-12 text-base focus:outline-none  focus:border-primary transition"
                    />
                    {query && (
                        <button
                        onClick={() => setQuery("")}
                        className="absolute right-5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                        <X className="w-5 h-5" />
                        </button>
                    )}
                </div>
                <div className="flex justify-center gap-2 mt-6">
                    {(["all", "movie", "series"]).map((t) => (
                        <button
                        key={t}
                        onClick={() => {
                          setType(t)
                          setGenre("All")
                        }
                        }
                        className={`
                            rounded-full px-5 py-2 text-sm border border-slate-800 transition capitalize
                            ${type === t
                            ? "bg-gradient-orange border-transparent text-primary-foreground shadow-glow"
                            : "border-border text-muted-foreground hover:text-foreground"}
                        `}
                        >
                        {t === "all" ? "All" : t === "series" ? "series" : t + "s"}
                        </button>
                    ))}
                </div>
            </section>
            <section className="px-6 md:px-12 pb-24">
        {!isSearching ? (
          <div className="space-y-12 max-w-5xl mx-auto">
            <div>
              <h2 className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" /> Trending Searches
              </h2>
              <div className="flex flex-wrap gap-2">
                {TRENDING_SEARCHES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setQuery(s.split(" ")[0])}
                    className="glass rounded-full px-4 py-2 text-sm hover:border-primary hover:text-primary transition"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">Browse by Genre</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {GENRES.map((g) => (
                  <button
                    key={g}
                    onClick={() => setGenre(g)}
                    className="h-15 rounded-2xl overflow-hidden border border-border group hover:border-primary transition"
                  >
                    <div className="relative h-full flex items-center justify-center text-xl font-bold hover:text-slate-900 z-10 transition-colors duration-75 before:absolute before:inset-0 hover:before:bg-primary before:-z-20 before:transition-colors before:duration-75">{g}</div>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">Popular Right Now</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {genre === "All" && ((discover?.["movies"]?.concat(discover?.["tv"]))?.map((t) => ( <MovieCard3 t={t} k={t.id}/>)))}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm text-muted-foreground">
                {query && <> for "<span className="text-foreground">{query}</span>"</>}
              </div>
              {(genre !== "All" || type !== "all") && (
                <button
                  onClick={() => { setGenre("All"); setType("all"); }}
                  className="text-sm text-primary hover:underline"
                >
                  Clear filters
                </button>
              )}
            </div>
            {type === "movie" ? (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {discover?.["movies"]?.map((t) => ( <MovieCard3 t={t} k={t.id}/>))}
              </div>
            ) : (
              (type === "series" && (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                  {discover?.["tv"]?.map((t) => ( <MovieCard3 t={t} k={t.id}/>))}
                </div>
              ))
            )}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {((discover?.["movies"]?.concat(discover?.["tv"]))?.map((t) => {
                const id = genres?.find(g => g?.name === genre);
                console.log("repainting by genre...");

                if(t?.genre_ids?.includes(id?.id)){
                  return  <MovieCard3 t={t} k={t.id}/>
                }
                console.log("done");

              }))}
            </div>
          </div>
        )}
      </section>
        </main>
    )
}

export default Discover;