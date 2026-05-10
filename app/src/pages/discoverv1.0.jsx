import MovieCard1 from "@/components/cards/MovieCard1";
import { MovieCard3 } from "@/components/cards/MovieCard3";
import { getDiscover, getGenres, getKeywords, getSearchData, getTypeDiscover } from "@/services/api";
import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { MdSearch } from "react-icons/md";
import { useSearchParams } from "react-router-dom";
import { DiscoverSection, SearchResultSection } from "@/components/filmSection";

const Discover = () => {
  const GENRES = ["Science Fiction", "Drama", "Thriller", "Adventure", "Mystery", "Action"];

  const [temporaryQuery, setTemporaryQuery] = useState("");
  const [genres, setGenres] = useState();
  const [discover, setDiscover] = useState();
  const [keywords,setKeywords] = useState();
  const [searchData, setSearchData] = useState();

  const [searchParam, setSearchParam] = useSearchParams();
  const page = Number(searchParam.get("page") ?? 1);
  const type = searchParam.get("type") ?? "all";
  const genre = searchParam.get("genre") ?? "All";
  const query = searchParam.get("query") ?? "";
  const search = useRef();

  console.log("search", searchData);
  

  const isSearching = query.length > 0 || genre !== "All" || type !== "all";

  const updateParams = (key, value) => {
    const params = new URLSearchParams(searchParam);

    params.set(key,value);

    setSearchParam(params);
  }

  const changeType = (t) => {
    setSearchParam(() => {
      const params = new URLSearchParams();
      params.set("type", t)
      params.set("page", 1)

      return params;
    })
  }
  const changeQuery = (q) => {
    setSearchParam(() => {
      const params = new URLSearchParams();
      params.set("query", q)
      params.set("type", 'all')

      return params;
    })
  }

  const resetParams = () => {
    setSearchParam(() => {
      const params = new URLSearchParams();
      params.set("type", "all")
      params.set("page", 1)

      return params;
    })
  }

  const resetGenreAndPage = () => {
    setSearchParam(() => {
      const params = new URLSearchParams();
      params.set("type", "all")
      params.set("page", page)

      return params;
    })
  }

  useEffect(() => {

    const initGenres = async () => {
      const genres = await getGenres();
      setGenres(genres);
    }

    initGenres();
  },[])

  useEffect(()=>{
    const not  = ()=>{
      if(!query || keywords?.length === 0) setKeywords('');
    }

    const initKeywords = async (query)=>{
      const thisKeywords = await getKeywords(query);
      setKeywords(thisKeywords)
    }

    not()
    //debouncing - delay until typing stops
    const timeout = setTimeout(()=>{
      initKeywords(query)
    },500)

    return ()=> clearTimeout(timeout)
  },[keywords?.length, query])

  useEffect(() => {
    const initSearchData = async () => {
      const thisSearchData =  await getSearchData(query,page);
      setSearchData(thisSearchData);
    }

    initSearchData();
  },[page, query])
  console.log("query",query.length);
  

  useEffect(() => {
    const getData = async () => {
      let data;
      if(type === "all"){
        data = await getDiscover(page);
      } else {
        data = await getTypeDiscover(type, page)
      }

      setDiscover(data);
    }
    getData()
  },[page, type])

  const topRef = useRef();
  useEffect(() => {
    topRef?.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  },[query,type])

  const keywordsRef = useRef();
  useEffect(() => {
    const closeElement = (e) => {
      const bounds = keywordsRef?.current?.getBoundingClientRect();
      if(bounds?.top > e.clientY || bounds?.bottom < e.clientY || bounds?.left > e.clientX ||bounds?.  right < e.clientX){
        keywordsRef?.current?.classList?.add("hidden")
      }
    }
    document.addEventListener("click",closeElement)
    return () => document.removeEventListener("click", closeElement)
  },[])

  const allDiscoveryData = type === "all" ? [...(discover?.['movies']?.results.map(m => ({...m, media_type: "movie"})) || []), ...(discover?.['tv']?.results.map(t => ({...t, media_type: "tv"})) || [])] : [];

  return(
    <main ref={topRef} className="min-h-50 min-w-full text-background dark:text-gray-300 bg-foreground dark:bg-background">
      <section className="px-6 md:px-12 pt-16 pb-8 max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-3 md:text-6xl text-background dark:text-foreground">Discover what to <span className="text-primary">watch</span></h1>
        <p className="text-center text-background dark:text-muted-foreground mb-8">Search across thousands of movies and  series.</p>
        <div className="relative">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-background/50 dark:text-muted-foreground z-20" />
          <input
            ref={search}
            value={query}
            onChange={(e) => {
              setTemporaryQuery(e.target.value);
              changeQuery(e.target.value)

              if(!e?.target?.value){resetParams()}
              if(keywordsRef?.current.classList.contains("hidden")){keywordsRef?.current.classList.remove("hidden");}
            }}
            placeholder="Search titles, genres, actors…"
            className="w-full glass rounded-full h-14 pl-14 pr-12 text-background/50 dark:text-foreground/50 placeholder-muted/50 dark:placeholder-foreground/50 focus:outline-none focus:border-primary transition"
          />
          {query && (
            <button
              onClick={() =>{resetParams()}}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-muted/50 hover:dark:text-foreground hover:text-muted transition-colors duration-75"
              >
              <X className="w-5 h-5" />
            </button>
          )}
          {keywords && keywords?.length > 0 && temporaryQuery !== '' && (
            <div ref={keywordsRef} className="absolute left-1/2 -translate-x-1/2 top-[calc(100%+5px)] rounded-lg transition-all duration-300 z-20 w-[95%] min-h-20 max-h-90 overflow-auto p-1 space-y-1 bg-primary">
              {
                keywords.map((k,i)=>(
                  <div onClick={()=> {
                      updateParams("query",k.name)
                      setTemporaryQuery('')
                    }} key={i} className="h-fit hover:bg-muted hover:text-white rounded-md p-3 flex items-center text-foreground cursor-pointer gap-3">
                    <MdSearch size={20}/>
                    <p>{k.name}</p>
                  </div>
                ))
              }
            </div>
          )}
        </div>
        <div className="flex justify-center gap-2 mt-6">
          {["all", "movie", "tv"].map((t) => (
            <button
              key={t}
              onClick={() => {
                changeType(t);
              }}
              className={`
                rounded-full px-5 py-2 text-sm border border-muted/50 dark:border-border transition capitalize
                ${type === t
                ? "bg-primary border-transparent text-foreground dark:text-primary-foreground shadow-glow"
                : "border-border text-muted/50 dark:text-muted-foreground hover:text-background hover:dark:text-foreground"}
              `}
              >
                {t === "all" ? "All" : t === "tv" ? "series" : t + "s"}
            </button>
          ))}
        </div>
      </section>
      <section className="px-2 md:px-12 pb-24">
        {!isSearching ? (
          <div className="space-y-12 max-w-5xl mx-auto">
            <div>
              <h2 className="text-sm uppercase tracking-[0.2em] text-background dark:text-muted-foreground mb-4">Browse by Genre</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {GENRES.map((g) => (
                  <button
                    key={g}
                    onClick={() => updateParams("genre",g)}
                    className="h-15 rounded-2xl overflow-hidden border border-muted/50 dark:border-border group    hover:border-0 transition duration-150"
                  >
                    <div className="relative h-full flex items-center justify-center text-xl font-bold hover:dark:text-slate-900 hover:text-foreground z-10 transition-colors duration-75 before:absolute before:inset-0 hover:before:bg-primary before:-z-20 before:transition-colors before:duration-75 dark:text-foreground text-background">{g}</div>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-sm uppercase tracking-[0.2em] text-background dark:text-muted-foreground mb-4">Popular Right Now</h2>
              {genre === "All" && type === 'all' &&
                <DiscoverSection films={allDiscoveryData} page={page} total={discover?.["movies"]?.total_pages + discover?.["tv"]?.total_pages} setPage={(p) => updateParams("page", p)} />
              }
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm text-background dark:text-muted-foreground">
                {query && <> for "<span className="text-background dark:text-foreground">{query}</span>"</>}
                {genre !== 'All' && <> for "<span className="text-background dark:text-foreground">{genre}</span>"</>}
                {type !== "all" && <> for "<span className="text-background dark:text-foreground">{type}</span>"</>}
              </div>
              {(genre !== "All" || type !== "all") && (
                <button
                  onClick={() => {
                    if(type !== 'all'){
                      resetParams();
                    } else {
                      resetGenreAndPage();
                    }
                  }}
                  className="text-sm text-primary hover:underline"
                >
                  Clear filters
                </button>
              )}
            </div>
            {type === "movie" ? (
              <DiscoverSection films={discover?.results?.map(d => ({...d, media_type: "movie"}))} page={page} total={discover?.total_pages} setPage={(p) => updateParams("page", p)} />
            ) : (
              (type === "tv" && (
                <DiscoverSection films={discover?.results?.map(d => ({...d, media_type: "tv"}))} page={page} total={discover?.total_pages} setPage={(p) => updateParams("page", p)} />
              ))
            )}
            {genre !== 'All' && (
              <>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {allDiscoveryData?.map((t, i) => {
                  const id = genres?.find(g => g?.name === genre);
                  if(t?.genre_ids?.includes(id?.id)){
                    return  <MovieCard3 key={i} t={t} k={t.id}/>
                  }
                })}
              </div>
              </>
            )}
            <SearchResultSection results={searchData?.results} page={page} total={searchData?.total_pages} setPage={(p) => updateParams("page", p)} />
          </div>
        )}
      </section>
      <footer className="border-t border-muted/50 dark:border-border py-8 px-6 mt-5 md:px-12 text-center text-xs dark:text-muted-foreground">
        © {new Date().getFullYear()} FilmBase · Built for cinema.
      </footer>
    </main>
  )
}

export default Discover;