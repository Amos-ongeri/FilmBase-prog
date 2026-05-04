import { useState,useEffect, useRef } from "react";
import MovieCard1 from "../components/cards/MovieCard1";
import CardSkeleton from "@/components/skeletons/cardSkeleton";
import MovieCard from "@/components/cards/MovieCard";
import { getGenres, getTv } from "@/services/api";

const TvSeries = ()=>{
    const [tv, setTv] = useState({
                popular: [],
                top_rated: [],
                on_the_air: [],
                airing_today: []
            })
    const [genres, setGenres] = useState();
    const [genre, setGenre] = useState("All");
    const [category, setCategory] = useState("All");    

    useEffect(()=> {
        const initTv = async () => {
            const tv = await getTv()
            setTv(prev => {
                const newState = {...prev};
                tv?.forEach(t => newState[t.category] = t.tv)
                return newState
            })
        }
        initTv()
        const initGenres = async () => {
            const gen = await getGenres('tv');
            setGenres(gen);
        }
        initGenres()
    },[])
    useEffect(() => {
        console.log("tv updated:", tv);
    }, [tv]);

    const hasTv = [
        tv?.airing_today,
        tv?.on_the_air,
        tv?.popular,
        tv?.top_rated
    ].every(member => member?.length !== 0 && member !== undefined)
    const allTv = [...(tv?.["airing_today"] || []),...(tv?.["top_rated"] || []),...(tv?.["popular"] || []),...(tv?.["on_the_air"] || [])];

    const topRef = useRef();
        
    useEffect(() => {
        topRef?.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    },[])
    console.log("genre", genre);
    

    return(
        <div ref={topRef} className="w-full min-h-50 text-gray-300 bg-background">
            <section className="px-6 md:px-12 mt-16 mb-24">
        <div className="flex items-end justify-between mb-6 flex-wrap gap-4">
          <h2 className="text-2xl md:text-3xl font-bold">All Series</h2>
          <div className="flex flex-wrap gap-2 text-sm">
            <span onClick={() => setCategory("All")} className={`glass rounded-full px-3.5 py-1.5 transition hover:-translate-y-1 ${category === "All" ? "bg-primary" : "glass"}`}>All</span>
            {(["airing_today", "top_rated", "popular", "on_the_air"]).map((s) => (
              <button
                key={s}
                onClick={() => setCategory(s)}
                className={`rounded-full px-3.5 py-1.5 transition hover:-translate-y-1  ${category === s ? "bg-primary" : "glass"}`}
              >
                {s === "airing_today" ? "Airing Today" : s === "top_rated" ? "Top Rated" : s === "popular" ? "Popular" : "On The Air"}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-2 flex-wrap mb-8">
          {["All", ...(genres?.map(gen => gen?.name)) || []].map((g) => (
            <button
              key={g}
              onClick={() => setGenre(g)}
              className={`rounded-full px-4 py-1.5 text-sm border transition ${genre === g && "bg-primary"}`}
            >
              {g}
            </button>
          ))}
        </div>
      </section>
            {hasTv ? (
                <>
                    <div className="min-h-50 min-w-full px-10 ">
                        {/* <p className="text-white text-2xl">&#128293;airing_today</p> */}
                        <br />
                        {genre === "All" ? (
                            <div className="grid lg:grid-cols-7 grid-cols-2 space-y-5">
                            {
                                [...new Set(allTv)]?.map((tv,i)=>(
                                    <MovieCard Key={i} movie={tv} genre={genres} index={i}/>
                                ))
                            }
                            </div>
                        ) : (
                            <div className="grid lg:grid-cols-7 grid-cols-2 space-y-5">
                            {
                                allTv?.map((tv,i)=>{
                                    const compare = genres?.find(g => g?.name === genre);
                                    if(tv?.genre_ids?.includes(compare?.id)){
                                        return <MovieCard Key={i} movie={tv} genre={genres} index={i}/>
                                    } else {
                                        return null;
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
            <footer className="border-t border-border py-8 px-6 md:px-12 text-center text-xs text-muted-foreground">
                © {new Date().getFullYear()} FilmBase · Built for cinema.
            </footer>
        </div>
    )
}

export default TvSeries;