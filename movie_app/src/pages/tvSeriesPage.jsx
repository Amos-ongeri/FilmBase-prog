import { useState,useEffect, useRef } from "react";
import MovieCard1 from "../components/cards/MovieCard1";
import CardSkeleton from "@/components/skeletons/cardSkeleton";
import MovieCard from "@/components/cards/MovieCard";
import { getGenres, getTv } from "@/services/api";
import { cn } from "@/lib/utils";

const TvSeries = ()=>{
    const [tv, setTv] = useState({
                popular: [],
                top_rated: [],
                on_the_air: [],
                airing_today: []
            })
    const [genres, setGenres] = useState();

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
            const gen = await getGenres();
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
    const allTv = [...tv["airing_today"],...tv["top_rated"],...tv["popular"],...tv["on_the_air"]];
    const GENRES = ["Sci-Fi", "Drama", "Thriller", "Adventure", "Mystery", "Action"];

    const topRef = useRef();
        
    useEffect(() => {
        topRef?.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    },[])


    return(
        <div ref={topRef} className="w-full min-h-50 text-gray-300">
            <section className="px-6 md:px-12 mt-16 mb-24">
        <div className="flex items-end justify-between mb-6 flex-wrap gap-4">
          <h2 className="text-2xl md:text-3xl font-bold">All Series</h2>
          <div className="flex items-center gap-2 text-sm">
            {(["airing_today", "top_rated", "popular", "on_the_air"]).map((s) => (
              <button
                key={s}
                className={cn(
                  "glass rounded-full px-3.5 py-1.5 transition",
                )}
              >
                {s === "airing_today" ? "Airing Today" : s === "top_rated" ? "Top Rated" : s === "popular" ? "Popular" : "On The Air"}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-2 flex-wrap mb-8">
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
      </section>
            {hasTv ? (
                <>
                    <div className="min-h-50 min-w-full px-10 ">
                        {/* <p className="text-white text-2xl">&#128293;airing_today</p> */}
                        <br />
                        <div className="grid lg:grid-cols-5 grid-cols-2 space-y-5">
                            {
                                allTv?.map((tv,i)=>(
                                    <MovieCard Key={i} movie={tv} genre={genres} index={i}/>
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
        </div>
    )
}

export default TvSeries;