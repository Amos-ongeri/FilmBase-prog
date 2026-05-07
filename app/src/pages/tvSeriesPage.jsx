import { useState,useEffect, useRef } from "react";
import CardSkeleton from "@/components/placeholders/cardSkeleton";
import MovieCard from "@/components/cards/MovieCard";
import { getTv, getTvGenres } from "@/services/api";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

const TvSeries = ()=>{
    const [tv, setTv] = useState({ popular: [], top_rated: [], on_the_air: [], airing_today: [] })
    const [genres, setGenres] = useState();
    const [genre, setGenre] = useState("All");
    const [category, setCategory] = useState("All");

    const initTv = async () => {
        const tv = await getTv()
        setTv(() => {
            const newState = {};
            tv?.forEach(t => newState[t.category] = t.tv)
            return newState
        })
    }
    const initTvGenres = async () => {
        const gen = await getTvGenres('tv');
        setGenres(gen);
    }

    useEffect(()=> {
        const loadData = async () => {
            await Promise.all([initTv(),initTvGenres()])
        }
        loadData();
    },[])

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

    return(
        <div ref={topRef} className="w-full min-h-50 text-background dark:text-gray-300 bg-foreground dark:bg-background">
            <section className="px-5 md:px-12 pt-16">
                <div className="flex items-end justify-between mb-6 flex-wrap gap-4">
                    <h2 className="text-2xl md:text-3xl font-bold">All Series</h2>
                    <div className="flex flex-wrap gap-2 text-sm">
                        <span onClick={() => setCategory("All")} className={`glass rounded-full px-3.5 py-1.5 transition hover:-translate-y-1 ${category === "All" ? "bg-primary" : "glass"}`}>All</span>
                        {(["airing_today", "top_rated", "popular", "on_the_air"]).map((s) => (
                            <button
                                key={s}
                                onClick={() => setCategory(s)}
                                className={`rounded-full px-3.5 py-1.5 transition duration-75 hover:-translate-y-1  ${category === s ? "bg-primary" : "glass"}`}
                            >
                                {s === "airing_today" ? "Airing Today" : s === "top_rated" ? "Top Rated" : s === "popular" ? "Popular" : "On The Air"}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex gap-2 flex-wrap">
                    {["All", ...(genres?.map(gen => gen?.name)) || []].map((g) => (
                        <button
                            key={g}
                            onClick={() => setGenre(g)}
                            className={`rounded-full px-4 py-1.5 text-sm transition duration-75 ${genre === g ? "bg-primary" : "border dark:border-border border-muted/50"}`}
                        >
                            {g}
                        </button>
                    ))}
                </div>
            </section>
            {hasTv ? (
                <>
                    <div className="min-h-50 min-w-full px-2 md:px-12">
                        <br />
                        {genre === "All" ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                                {[...new Set(allTv)]?.map((tv,i)=>(
                                    <MovieCard key={i} movie={tv} genre={genres} index={i}/>
                                ))}
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                                {allTv?.map((tv,i)=>{
                                    const compare = genres?.find(g => g?.name === genre);
                                    if(tv?.genre_ids?.includes(compare?.id)){
                                        return <MovieCard key={i} movie={tv} genre={genres} index={i}/>
                                    } else {
                                        return null;
                                    }
                                })}
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
            <br />
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#" isActive>
                        2
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href="#" />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
            <br />
            <footer className="border-t border-muted/50 dark:border-border py-8 px-6 md:px-12 mt-5 text-center text-xs dark:text-muted-foreground">
                © {new Date().getFullYear()} FilmBase · Built for cinema.
            </footer>
        </div>
    )
}

export default TvSeries;