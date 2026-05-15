import { Play, Plus, Share2, Heart, Star, Clock, Calendar, ChevronRight, X, MessageCircle, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams} from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import avatar from '../assets/user-avatar.png';
import { getConfigs, getCredits, getDetails, getImages, getProviders, getReviews, getSimilar, getVideos } from "@/services/api";
import { formatNumber } from "@/utils/formatLargeNo";

//maps language codes to original language e.g en - English
import ISO6391 from "iso-639-1";

import { BackdropsCarousel, PostersCarousel } from "@/components/imageCarousel";
import { Spinner } from "@/components/ui/spinner";
import { getPosterSize } from "@/utils/imageSizes";
import { getRelativeTime } from "@/utils/RTF";


const platforms = ["Netflix", "Prime Video", "Disney+", "Apple TV+", "Max", "Hulu"];
let similarNullFilter = []

const Details = () => {
  const {tmdb_id, media_type} = useParams();

  const [details, setDetails] = useState();
  const [videos, setVideos] = useState([]);
  const [images, setImages] = useState({});
  const [credits, setCredits] = useState();
  const [similar,setSimilar] = useState();
  const [reviews,setReviews] = useState();
  const [configs, setConfigs] = useState({});
  const [providers, setProviders] = useState({});
  const [YT, setYT] = useState(false);
  const [moreRecommendations, setMoreRecommendations] = useState(false);
  const topRef = useRef();
  const cast = useRef();
  const crew = useRef();

  // console.log("reviews", reviews);

  useEffect(() => {
    topRef?.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  },[tmdb_id])

  useEffect(()=>{
    const initDetails = async () => {
      const dets = await getDetails(tmdb_id, media_type);

      setDetails(dets)
    }

    const initVideos = async () => {
      const vids = await getVideos(tmdb_id, media_type);

      setVideos(vids);
    }

    const initCredits = async () => {
      const creds = await getCredits(tmdb_id, media_type);

      setCredits(creds);
    }

    const initSimilar = async () => {
      const similarTitles = await getSimilar(tmdb_id, media_type);

      setSimilar(similarTitles);
    }

    const initReviews = async () => {
      const revius = await getReviews(tmdb_id, media_type);

      setReviews(revius);
    }

    const initImages = async () => {
      const images = await getImages(media_type,tmdb_id);

      setImages(images);
    }

    const initConfigs = async () => {
      const conf = await getConfigs();
      
      setConfigs(conf);
    }

    const initProviders = async () => {
      const providers = await getProviders(media_type, tmdb_id);

      setProviders(providers)
    }

    const loadData = async () => {
      await Promise.all([initDetails(), initVideos(),
          initCredits(), initSimilar(), initReviews(),
          initImages(), initConfigs(), initProviders()]);
    }

    loadData();
  },[media_type, tmdb_id])

  useEffect(() => {
    if(similar){
      similarNullFilter = similar?.filter(m=> m.poster_path !== null)
    }
  },[similar])

  const navigation = useNavigate();
  const navigate = (data)=>{
      navigation(`/details/${data?.id}/${data?.media_type}`)
  }

  useEffect(() => {
    if (moreRecommendations) {
      document
        ?.querySelector("#item5")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  }, [moreRecommendations]);

  const ModalClose = (e,modal) => {
    const posModal = modal.current.getBoundingClientRect();
    const outPos = e.clientX < posModal.left || e.clientX > posModal.right || e.clientY < posModal.top || e.clientY > posModal.bottom;

    if(outPos){
      modal.current.close();
    }
  }

  return (
    <main ref={topRef} className="min-h-50 min-w-full bg-foreground dark:bg-background dark:text-foreground text-background">

      {/* HERO */}
      <section className="relative h-screen min-h-160 w-full overflow-hidden">
        {!details?.backdrop_path ? (<div className="absolute inset-0 w-full h-full flex items-center justify-center"><Spinner /></div>) : (
          <img
          src={`https://image.tmdb.org/t/p/w1280${details?.backdrop_path}`}
          alt="Movie backdrop"
          width={1920}
          height={1088}
          className="absolute inset-0 w-full h-full object-cover object-center"
          />
        )}
        <div className="absolute inset-0 bg-gradient-hero" />

        <div className="relative z-10 h-full flex items-end pb-20 px-6 md:px-12">
          <div className="max-w-2xl animate-fade-in">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary mb-5">
              <span className="h-px w-8 bg-primary" /> Featured Film
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-[1.05] w-full mb-6 transition-colors duration-300">
              {details?.title || details?.name}
            </h1>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm  dark:text-muted-foreground text-background/70 mb-7">
              <span className="flex items-center gap-1.5"><Star className="w-4 h-4 fill-primary text-primary" /> <span className="dark:text-foreground text-background font-semibold">{((details?.vote_average/10)*5).toFixed(1)}</span>/10</span>
              <span className="w-1 h-1 rounded-full bg-background dark:bg-muted-foreground/50" />
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{details?.release_date?.split("-")[0] || details?.first_air_date?.split("-")[0]}</span>
              <span className="w-1 h-1 rounded-full bg-background dark:bg-muted-foreground/50" />
              {details?.runtime && (<><span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {Math.floor((details?.runtime)/60)}hrs {(details?.runtime)%60}mins</span>
              <span className="w-1 h-1 rounded-full bg-background dark:bg-muted-foreground/50" /></>)}
              <span className="px-2 py-0.5 border border-border rounded text-xs">PG-13</span>
              <span className="w-1 h-1 rounded-full bg-background dark:bg-muted-foreground/50" />
              {details?.genres?.map((g,i) => (
                <>
                  <span>{g?.name}</span>
                  <span>{i < details?.genres?.length - 1 ? "\u00B7" : ""}</span>
                </>
              ))}

            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button onClick={() => {document.getElementById("trailer")?.scrollIntoView({
                behavior: "smooth"
                });}} size="lg" className="bg-primary hover:opacity-90 text-popover-foreground rounded-full px-7 h-12 shadow-glow font-semibold">
                <Play className="w-4 h-4 fill-current" /> Watch Trailer
              </Button>
              <Button size="lg" variant="outline" className="glass rounded-full px-6 h-12 font-medium hover:bg-white/10 text-primary-foreground">
                <Plus className="w-4 h-4" /> Add to Watchlist
              </Button>
              <button className="h-12 w-12 rounded-full glass flex items-center justify-center hover:bg-white/10 transition">
                <Heart className="w-4 h-4" />
              </button>
              <button className="h-12 w-12 rounded-full glass flex items-center justify-center hover:bg-white/10 transition">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT — poster + details */}
      <section className="px-6 md:px-12 mt-5 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-10">
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-orange opacity-0 group-hover:opacity-30 blur-sm transition duration-500 rounded-3xl" />
            <img
              src={`https://image.tmdb.org/t/p/w1280${details?.poster_path}`}
              alt="Poster"
              width={512}
              height={768}
              loading="lazy"
              className="relative rounded-2xl w-full shadow-[hsl(var(--card))] border border-border"
            />
          </div>
          <div className="pt-8">
            <p className="text-primary italic text-lg mb-4">"{details?.tagline}"</p>
            <h2 className="text-2xl font-bold mb-3">Synopsis</h2>
            <p className="dark:text-muted-foreground leading-relaxed mb-8 max-w-3xl">
              {details?.overview}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[
                ["Director", `${(credits?.crew?.filter(c => c?.job === 'Director'))?.[0]?.name}`],
                ["Language", `${ISO6391.getName(details?.original_language)}`],
                ["Status", `${details?.status}`],
                ["Budget", formatNumber(details?.budget)],
              ].map(([k, v]) => (
                <div key={k}>
                  <div className="text-xs uppercase tracking-wider dark:text-muted-foreground mb-1.5">{k}</div>
                  <div className="font-semibold dark:text-foreground">{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/*images*/}
      <section className="px-6 md:px-12 mt-5">
        <p className="text-primary italic text-lg mb-4">{images?.backdrops?.length} backdrops</p>
        <BackdropsCarousel backdrops={images?.backdrops} />
      </section>
      <section className="px-6 md:px-12 mt-5">
        <p className="text-primary italic text-lg mb-4">{images?.posters?.length} posters</p>
        <PostersCarousel posters={images?.posters} />
      </section>

      {/* CAST */}
      <dialog ref={cast} onClick={(e) => {ModalClose(e,cast)}} className="w-full h-full md:w-[70%] md:h-[80%] m-auto rounded-md p-5">

        <div className="flex sticky top-0 z-20 mb-5">
          <p className=" text-lg glass flex items-center rounded-2xl px-3">({credits?.cast?.length}) Cast</p>
          <button className="glass p-2 rounded-full ml-auto flex" onClick={() => cast.current.close()}><X/></button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2">
          {credits?.cast?.map((c,i) => (
            <div key={i} className="flex items-center gap-5">
              <div className="relative w-20 h-20 md:w-28 md:h-28 mb-3 group">
                <div className="absolute inset-0 rounded-full bg-gradient-orange opacity-0 group-hover:opacity-60 blur-xs transition" />
                <img
                  src={c.profile_path !== null ? `https://image.tmdb.org/t/p/w500${c.profile_path}` : avatar}
                  alt={c.name}
                  width={512}
                  height={512}
                  loading="lazy"
                  className="relative w-full h-full rounded-full object-cover border-2 border-border group-hover:border-primary transition"
                />
              </div>
              <div>
                <p className="md:text-2xl">{c?.name}</p>
                <p>{c?.known_for_department}</p>
              </div>
            </div>
          ))}
        </div>
      </dialog>

      <section className="px-6 md:px-12 mt-24">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">Top Cast</h2>
          {credits?.cast?.length > 6 && (<a className="text-sm dark:text-muted-foreground hover:text-primary flex items-center gap-1 transition" onClick={() => cast.current.showModal()}>Full cast <ChevronRight className="w-4 h-4" /></a>)}
        </div>
        <div className="flex gap-5 overflow-x-auto scrollbar-hide py-3 -mx-6 md:-mx-12 px-6 md:px-12">
          {credits?.cast?.slice(0,6)?.map((c, i) => (
            <div key={i} className="shrink-0 w-32 text-center group cursor-pointer">
              <div className="relative w-28 h-28 mx-auto mb-3">
                <div className="absolute inset-0 rounded-full bg-gradient-orange opacity-0 group-hover:opacity-60 blur-xs transition" />
                <img
                  src={c.profile_path !== null ? `https://image.tmdb.org/t/p/w500${c.profile_path}` : avatar}
                  alt={c.name}
                  width={512}
                  height={512}
                  loading="lazy"
                  className="relative w-full h-full rounded-full object-cover border-2 border-border group-hover:border-primary transition"
                />
              </div>
              <div className="text-sm font-semibold truncate">{c.name}</div>
              <div className="text-xs text-muted-foreground truncate">{c.role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CREW */}
      <dialog ref={crew} onClick={(e) => {ModalClose(e,crew)}} className="w-full h-full md:w-[70%] md:h-[80%] m-auto rounded-md p-5">
        <div className="flex sticky top-0 z-20 mb-5">
          <p className=" text-lg glass flex items-center rounded-2xl px-3">({credits?.crew?.length}) Crew</p>
          <button className="glass p-2 rounded-full ml-auto flex" onClick={() => crew.current.close()}><X/></button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2">
          {credits?.crew?.map((c,i) => (
            <div key={i} className="flex items-center gap-5">
              <div className="relative w-20 h-20 md:w-28 md:h-28 mb-3 group">
                <div className="absolute inset-0 rounded-full bg-gradient-orange opacity-0 group-hover:opacity-60 blur-xs transition" />
                <img
                  src={c.profile_path !== null ? `https://image.tmdb.org/t/p/w500${c.profile_path}` : avatar}
                  alt={c.name}
                  width={512}
                  height={512}
                  loading="lazy"
                  className="relative w-full h-full rounded-full object-cover border-2 border-border group-hover:border-primary transition"
                />
              </div>
              <div>
                <p className="md:text-2xl">{c?.name}</p>
                <p>{c?.known_for_department}</p>
              </div>
            </div>
          ))}
        </div>
      </dialog>

      <section className="px-6 md:px-12 mt-24">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold"> Crew </h2>
          {credits?.crew?.length > 6 && (<a className="text-sm dark:text-muted-foreground hover:text-primary flex items-center gap-1 transition" onClick={() => crew.current.showModal()}>Full crew <ChevronRight className="w-4 h-4" /></a>)}
        </div>
        <div className="flex gap-5 overflow-x-auto scrollbar-hide py-3 -mx-6 md:-mx-12 px-6 md:px-12">
          {credits?.crew?.slice(0,6)?.map((c, i) => (
            <div key={i} className="shrink-0 w-32 text-center group cursor-pointer">
              <div className="relative w-28 h-28 mx-auto mb-3">
                <div className="absolute inset-0 rounded-full bg-gradient-orange opacity-0 group-hover:opacity-60 blur-xs transition" />
                <img
                  src={c.profile_path !== null ? `https://image.tmdb.org/t/p/w500${c.profile_path}` : avatar}
                  alt={c.name}
                  width={512}
                  height={512}
                  loading="lazy"
                  className="relative w-full h-full rounded-full object-cover border-2 border-border group-hover:border-primary transition"
                />
              </div>
              <div className="text-sm font-semibold truncate">{c.name}</div>
              <div className="text-xs text-muted-foreground truncate">{c.role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TRAILER */}
      <section id="trailer" title={`${videos === undefined || videos?.length === 0 ? "this video is not available" : ""}`} className="relative md:px-12 mt-24" >
        <h2 className="text-2xl md:text-3xl px-6 font-bold mb-6">Official Trailer</h2>
        <div className={`relative md:rounded-3xl overflow-hidden shadow-card group cursor-pointer md:max-w-5xl mx-auto h-60 md:h-96 ${videos === undefined || videos?.length === 0 ? "grayscale pointer-events-none" : ""}`}>
          {YT && videos?.length > 0 ? (
            <iframe
              width={560}
              height={315}
              title={videos?.[0]?.name}
              key={videos?.[0]?.key}
              src={`https://www.youtube.com/embed/${videos?.[0]?.key}?rel=0${YT ? "&autoplay=1" : ""}` }
              allow="accelerometer; autoplay; clipboard-write; encrypted-media;gyroscopepicture-in-picture"
              allowFullScreen
              className="absolute inset-0 object-cover w-full h-full object-center">
            </iframe>
          ) : (
            <>
            <div className="absolute -inset-1 bg-gradient-orange opacity-30 blur-2xl -z-10" />
            <img src={`https://image.tmdb.org/t/p/w1280${details?.backdrop_path}`} alt="Trailer" width={1920} height={1088} loading="lazy" className="w-full aspect-video object-cover brightness-65 group-hover:brightness-80 transition" />
            <div onClick={() => {
              if (videos?.length > 0) setYT(true);
            }} className="absolute inset-0 flex items-center justify-center">
              <div className="h-20 w-20 rounded-full bg-primary flex items-center justify-center shadow-glow group-hover:scale-110 transition">
                <Play className="w-8 h-8 fill-current text-foreground ml-1" />
              </div>
            </div>
            <div onClick={() => {
              if (videos?.length > 0) setYT(true);
            }}  className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-widest text-primary mb-1">Trailer</div>
                <div className="text-sm md:text-lg font-bold">{videos?.[0]?.name}</div>
              </div>
            </div>
            </>
          )}
        </div>
      </section>

      {/* WHERE TO WATCH */}
      <section className="px-6 md:px-12 mt-24">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Where to Watch</h2>
        <div className="flex flex-wrap gap-3">
          {platforms.map((p) => (
            <button key={p} className="glass rounded-2xl px-5 py-4 flex items-center gap-3 hover:border-primary hover:bg-white/5 transition group">
              <div className="h-10 w-10 rounded-xl bg-gradient-orange/20 border border-primary/30 flex items-center justify-center text-primary font-bold text-sm group-hover:bg-gradient-orange group-hover:text-primary-foreground transition">
                {p[0]}
              </div>
              <div className="text-left">
                <div className="font-semibold text-sm">{p}</div>
                <div className="text-xs text-muted/60 dark:text-muted-foreground">Stream now</div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* SIMILAR TITLES */}
      <section className="px-2 md:px-12 mt-24 mb-24">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">More Like This</h2>
          {similarNullFilter?.length > 5 && (<a className="text-sm dark:text-muted-foreground hover:text-primary flex items-center gap-1 transition" onClick={() => setMoreRecommendations(prev => !prev)}>{moreRecommendations  ? "View less" : "View all"} <ChevronRight className="w-4 h-4" /></a>)}
        </div>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {similarNullFilter?.slice(0,moreRecommendations ? similarNullFilter?.length : 5)?.map((r, i) => (
            <div id={`item${i}`} key={i} className="group scroll-mt-3">
              <div onClick={() => navigate(r)} className="relative overflow-hidden rounded-2xl mb-3 shadow-card">
                <img src={r?.poster_path ? `https://image.tmdb.org/t/p/${getPosterSize()}${r?.poster_path}` : ''}  alt={r.title} width={512} height={768} loading="lazy" className="w-full aspect-2/3 object-cover group-hover:scale-105 transition duration-500" />
                <div className="absolute inset-0 bg-linear-to-t from-background via-background/0 to-background/0 opacity-80" />
                <div className="absolute top-3 left-3 glass rounded-full px-2.5 py-1 flex items-center gap-1 text-xs">
                  <Star className="w-3 h-3 fill-primary text-primary" /> {((r?.vote_average/10)*5).toFixed(1)}
                </div>
                <div onClick={() => navigate(r)} className="absolute bottom-3 right-3 h-10 w-10 rounded-full bg-primary flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition cursor-pointer">
                  <Play className="w-4 h-4 fill-current text-foreground" />
                </div>
              </div>
              <div className="font-semibold text-sm group-hover:text-primary transition truncate">{r?.title || r?.name}</div>
              <div className="text-xs text-muted/50 dark:text-muted-foreground">{r?.release_date?.split("-")[0] || r?.first_air_date?.split("-")[0]}</div>
            </div>
          ))}
        </div>
      </section>

      {/* REVIEWS */}
      {reviews?.length !== 0 && (
        <section className="px-6 md:px-12 mb-24">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-1">User Reviews</h2>
            <p className="text-sm text-muted-foreground">{reviews?.length} reviews from the community</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {reviews  ?.map((r) => (
            <div key={r.id} className="glass overflow-y-auto rounded-2xl p-6 hover:border-primary/30 transition group">
              <div className="flex items-start gap-4 mb-4">
                <img src={r?.author_details?.avatar_path !== null ? `https://image.tmdb.org/t/p/w500${r?.author_details?.avatar_path}` : avatar} alt={r.author} className="w-12 h-12 rounded-full object-cover border border-border" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-sm">{r.author}</span>
                    <span className="text-xs text-muted-foreground">{getRelativeTime(r?.updated_at)}</span>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i < ((r?.author_details?.rating *5 ) / 10).toFixed(1) ? "fill-primary text-primary" : "text-muted-foreground/30"}`} />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5 line-clamp-5">{r?.content}</p>
            </div>
          ))}
        </div>
      </section>
      )}

      <footer className="border-t border-border py-8 px-6 md:px-12 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} FilmBase · Built for cinema.
      </footer>
    </main>
  );
};

export default Details;