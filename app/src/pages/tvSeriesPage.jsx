import { useState,useEffect, useRef } from "react";
import CardSkeleton from "@/components/placeholders/cardSkeleton";
import { getCategoryTv, getTv, getTvGenres } from "@/services/api";
import FilmSection from "@/components/filmSection";

const TvSeries = ()=>{
    const [tv, setTv] = useState({});
    const [popularTv, setPopularTv] = useState({});
    const [onTheAirTv, setOnTheAirTv] = useState({});
    const [topRatedTv, setTopRatedTv] = useState({});
    const [airingTodayTv, setAiringTodayTv] = useState({});
    const [pageAll, setPageAll] = useState(1);
    const [airingTodayPage, setAiringtodayPage] = useState(1)
    const [topRatedPage, setTopRatedPage]= useState(1);
    const [onTheAirPage, setOnTheAirPage] = useState(1);
    const [popularPage, setPopularPage] = useState(1);
    const [genres, setGenres] = useState();
    const [genre, setGenre] = useState("All");
    const [category, setCategory] = useState("All");

    useEffect(() => {
        const initTv = async () => {
            const tv = await getTv(pageAll)
            setTv(tv)
        }
        initTv()
    },[pageAll])

    useEffect(() => {
        const initTvGenres = async () => {
            const gen = await getTvGenres('tv');
            setGenres(gen);
        }
        initTvGenres()
    },[])

    useEffect(() => {
        const initOnTheAir = async () => {
        const ms = await getCategoryTv("on_the_air",onTheAirPage);
        setOnTheAirTv(ms)
        }
        initOnTheAir();
    },[onTheAirPage])

    useEffect(() => {
        const initTopRated = async () => {
        const ms = await getCategoryTv("top_rated",topRatedPage);
        setTopRatedTv(ms)
        }
        initTopRated();
    },[topRatedPage])

    useEffect(() => {
        const airingToday = async () => {
        const ms = await getCategoryTv("airing_today",airingTodayPage);
        setAiringTodayTv(ms)
        }
        airingToday();
    },[airingTodayPage])

    useEffect(()=> {
        const initPopular = async () => {
        const ms = await getCategoryTv("popular",popularPage);
      setPopularTv(ms)
        }
        initPopular();
    },[popularPage])

    const hasTv = [
        tv?.airing_today?.results,
        tv?.on_the_air?.results,
        tv?.popular?.results,
        tv?.top_rated?.results
    ].every(member => member?.length !== 0 && member !== undefined)

    const allTv = [...(tv?.airing_today?.results || []),...(tv?.top_rated?.results || []),...(tv?.popular?.results || []),...(tv?.on_the_air?.results || [])];

    const topRef = useRef();

    useEffect(() => {
        topRef?.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    },[])

    return(
        <div ref={topRef} className="w-full min-h-50 text-background dark:text-gray-300 bg-foreground dark:bg-background">
            <section className="px-5 md:px-12 pt-16 mb-8">
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
            <div className="min-h-0 min-w-full px-2 md:px-12">
            {hasTv ? (
                <>
                    { category === "All" && (
                        <FilmSection films={allTv} type={"tv"} genre={genre} genres={genres} page={pageAll} total={tv?.airing_today?.total_pages + tv?.popular?.total_pages + tv?.top_rated?.total_pages + tv?.on_the_air?.total_pages} setPage={setPageAll}/>
                    )}
                </>
            ) : (
                <div className="grid grid-cols-5 place-items-center pt-5">
                    {Array.from({length:5}).map((_,i) => (
                        <CardSkeleton key={i} />
                    ))}
                </div>
            )}
            {topRatedTv && category === "top_rated" && (
                <FilmSection films={topRatedTv.results} type={"tv"} genre={genre} genres={genres} page={topRatedPage} total={topRatedTv.total_pages} setPage={setTopRatedPage} />
            )}
            {airingTodayTv && category === "airing_today" && (
                <FilmSection films={airingTodayTv.results} type={"tv"} genre={genre} genres={genres} page={airingTodayPage} total={airingTodayTv.total_pages} setPage={setAiringtodayPage} />
            )}
            {onTheAirTv && category === "on_the_air" && (
                <FilmSection films={onTheAirTv.results} type={"tv"} genre={genre} genres={genres} page={onTheAirPage} total={onTheAirTv.total_pages} setPage={setOnTheAirPage} />
            )}
            {popularTv && category === "popular" && (
                <FilmSection films={popularTv.results} type={"tv"} genre={genre} genres={genres} page={popularPage} total={popularTv.total_pages} setPage={setPopularPage} />
            )}
            </div>
            <br />
            <footer className="border-t border-muted/50 dark:border-border py-8 px-6 md:px-12 mt-5 text-center text-xs dark:text-muted-foreground">
                © {new Date().getFullYear()} FilmBase · Built for cinema.
            </footer>
        </div>
    )
}

export default TvSeries;