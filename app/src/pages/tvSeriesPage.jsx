import { useState,useEffect, useRef } from "react";
import CardSkeleton from "@/components/placeholders/cardSkeleton";
import FilmSection from "@/components/filmSection";
import { useSearchParams } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";
import { getCategoryTv, getTv } from "@/api/tmdb.film/tvSeries";
import { getTvGenres } from "@/api/tmdb.genres/genres";

const TvSeries = ()=>{
    const [tv, setTv] = useState({});
    const [genres, setGenres] = useState();

    const [searchParam, setSearchParam]= useSearchParams();

    const page = Number(searchParam.get('page') ?? 1);
    const category = searchParam.get('category') ?? "All";
    const genre = searchParam.get('genre') ?? "All";

    const updateParam = (key, value) => {
        const param = new URLSearchParams(searchParam);

        param.set(key, value);

        setSearchParam(param);
    }

    const changeCategory = (cat) => {
        setSearchParam(prev => {
            const param = new URLSearchParams(prev);

            param.set("category", cat);
            param.set("page", 1);
            param.set("genre", "All");

            return param;
        })
    }

    useEffect(() => {
        const getData = async () => {
            let data;

            if(category === "All"){
                data = await getTv(page);
            } else {
                data = await getCategoryTv(category,page);
            }
            setTv(data);
        }
        getData();
    },[category,page])

    useEffect(() => {
        const initTvGenres = async () => {
            const gen = await getTvGenres('tv');
            setGenres(gen);
        }
        initTvGenres()
    },[])

    const hasTv = [
        tv?.airing_today?.results,
        tv?.on_the_air?.results,
        tv?.popular?.results,
        tv?.top_rated?.results
    ].every(member => member?.length !== 0 && member !== undefined)

    const allTv = category === "All" && [...(tv?.airing_today?.results || []),...(tv?.top_rated?.results || []),...(tv?.popular?.results || []),...(tv?.on_the_air?.results || [])];

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
                        <span onClick={() => changeCategory("All")} className={`rounded-full px-3.5 py-1.5 transition hover:-translate-y-1 ${category === "All" ? "bg-primary" : "glass"}`}>All</span>
                        {(["airing_today", "top_rated", "popular", "on_the_air"]).map((s) => (
                            <button
                                key={s}
                                onClick={() => changeCategory(s)}
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
                            onClick={() => updateParam("genre",g)}
                            className={`rounded-full px-4 py-1.5 text-sm transition duration-75 ${genre === g ? "bg-primary" : "border dark:border-border border-muted/50"}`}
                        >
                            {g}
                        </button>
                    ))}
                </div>
            </section>
            <div className="min-h-0 min-w-full px-2 md:px-12">
            {!hasTv && category === "All" ? (<div className="flex items-center justify-center"><Spinner /></div>) : (
                    <>
                        { category === "All" && (
                            <FilmSection films={allTv} type={"tv"} genre={genre} genres={genres} page={page} total={tv?.airing_today?.total_pages + tv?.popular?.total_pages + tv?.top_rated?.total_pages + tv?.on_the_air?.total_pages} setPage={(p) => updateParam("page", p)}/>
                        )}
                    </>
                )
            }
            {!tv ? (<Spinner />) :
                ((category === "top_rated" && (
                    <FilmSection films={tv?.results} type={"tv"} genre={genre} genres={genres} page={page} total={tv?.total_pages} setPage={(p) => updateParam("page", p)} />
                ))
            )}
            {category === "airing_today" && (
                (!tv ? (<Spinner />) : (
                    <FilmSection films={tv?.results} type={"tv"} genre={genre} genres={genres} page={page} total={tv?.total_pages} setPage={(p) => updateParam("page", p)} />
                ))
            )}
            {category === "on_the_air" && (
                (!tv ? (<Spinner />) : (
                    <FilmSection films={tv?.results} type={"tv"} genre={genre} genres={genres} page={page} total={tv?.total_pages} setPage={(p) => updateParam("page", p)} />
                ))
            )}
            {category === "popular" && (
                (!tv ? (<Spinner />) : (
                    <FilmSection films={tv?.results} type={"tv"} genre={genre} genres={genres} page={page} total={tv?.total_pages} setPage={(p) => updateParam("page", p)} />
                ))
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