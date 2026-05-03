import { Play, Plus, Share2, Heart, Star, Clock, Calendar, ChevronRight, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams} from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import avatar from '../assets/user-avatar.png';


const platforms = ["Netflix", "Prime Video", "Disney+", "Apple TV+", "Max", "Hulu"];
const detailsMap = new Map();
const videosMap = new Map();
const creditsMap = new Map();
const similarMap = new Map();
const reviewsMap = new Map();
const Details = () => {
    const {tmdb_id, media_type} = useParams();

    const [details, setDetails] = useState();
        const [videos, setVideos] = useState([]);
        const [credits, setCredits] = useState();
        const [similar,setSimilar] = useState();
        const [reviews,setReviews] = useState();
        const [YT, setYT] = useState(false);
        const topRef = useRef();

        useEffect(() => {
            topRef?.current?.scrollIntoView({ behavior: "smooth", block: "start" })
        },[tmdb_id])
        useEffect(()=>{
            const getDetails = async ()=>{
                try{
                let Details;
                if(detailsMap.has(tmdb_id)){
                    setDetails(detailsMap.get(tmdb_id))
                }else{
                    const details = await fetch(`http://localhost:5000/api/${tmdb_id}/${media_type}/details`)
                    Details = await details?.json();

                    detailsMap.set(tmdb_id,Details);
                    setDetails(Details);
                }
                }catch(e){
                    console.log(e.message);

                }

            }

            const getVideos = async ()=>{
                try{
                let Videos,trailer;
                if(videosMap.has(tmdb_id)){
                    setVideos(videosMap.get(tmdb_id))
                }else{
                    const videos = await fetch(`http://localhost:5000/api/${tmdb_id}/${media_type}/videos`)
                    const videosData = await videos.json();
                    Videos = videosData.results;
                    trailer = Videos?.filter(d=> d.type === 'Trailer')
                    videosMap.set(tmdb_id ,trailer);
                    setVideos(trailer)
                }
                }catch(e){
                    console.log(e.message);
                }
            }

            const getCredits = async ()=>{
                try{
                    if(creditsMap.has(tmdb_id)){
                        setCredits(creditsMap.get(tmdb_id))
                    }else{
                        const credits = await fetch(`http://localhost:5000/api/${tmdb_id}/${media_type}/credits`)
                        const creditsData = await credits.json();
                        creditsMap.set(tmdb_id,creditsData)
                        setCredits(creditsData)
                    }
                }catch(e){
                    console.log(e.message);
                }
            }

            const getSimilar = async ()=>{
                try{
                    if(similarMap.has(tmdb_id)){
                        setSimilar(similarMap.get(tmdb_id))
                    }else{
                        const similar = await fetch(`http://localhost:5000/api/${tmdb_id}/${media_type}/similar`)
                        const similarData = await similar.json();
                        console.log(similarData);
                        similarData.results = similarData?.results?.map(item=>({
                            ...item,
                            media_type: media_type
                        }))
                        similarMap.set(tmdb_id,similarData)
                        setSimilar(similarData.results)
                    }
                }catch(e){
                    console.log('error occurred: ',e.message);
                }
            }
            const getReviews = async ()=>{
                try{
                    if(reviewsMap.has(tmdb_id)){
                        setReviews(reviewsMap.get(tmdb_id))
                    }else{
                        const reviews = await fetch(`http://localhost:5000/api/${tmdb_id}/${media_type}/reviews`)
                        const reviewsData = await reviews.json();
                        reviewsMap.set(tmdb_id,reviewsData)
                        setReviews(reviewsData.results)
                    }
                }catch(e){
                    console.log('error occurred: ',e.message);
                }
            }

            getReviews()
            getSimilar()
            getCredits()
            getVideos()
            getDetails();
        },[media_type, tmdb_id])
        useEffect(() => {
          console.log("details updated:", details);
          console.log('videos updated:',videos);
          console.log('credit updated:',credits);
            console.log('similar updated:',similar);
            console.log('reviews updated:',reviews);
          console.log(location.pathname);

        }, [videos, details, credits, similar, reviews]);
        let similarNullFilter = []


        if(similar){
            similarNullFilter = (similar || [])?.filter(m=> m.poster_path !== null)
        }

        const navigation = useNavigate();
        const navigate = (data)=>{
            navigation(`/details/${data?.id}/${data?.media_type}`)
        }

        const [index, setIndex] = useState(0);
        const [visible, setVisible] = useState(true);

        const lines = [
            "Some stories end, but never really leave us.",
            "Every frame carries a feeling words cannot hold.",
            "The best films do not ask for attention, they keep it.",
            "A great story changes shape each time you return to it.",
            "Not every journey happens on a road.",
            "Some moments on screen stay longer than years in memory.",
            "Behind every silence, something is being said.",
            "The credits roll, but the meaning keeps moving.",
            "We watch for entertainment, and stay for recognition.",
            "Certain stories find us exactly when we need them.",
        ];
        useEffect(() => {
            const interval = setInterval(() => {
            setVisible(false);

            setTimeout(() => {
                setIndex((prev) => (prev + 1) % lines.length);
                setVisible(true);
            }, 500);
            }, 8000);

            return () => clearInterval(interval);
        }, [lines.length]);

        //removes 0s and replace with letter e.g 20000000 to $20M
        const formatNumber = (number) => {
          if(!number || number === 0) return "N/A";
          const units = ["", "K", "M", "B", "T"];
          const tier = Math.floor(Math.log10(Math.abs(number)) / 3);

          const suffix = units[tier];

          const scale = Math.pow(10, tier * 3);

          const scaled = number / scale;

          return "$" + scaled.toFixed(1).replace(/\.0$/,"") + suffix;
        }

        console.log(window.scrollY);

  return (
    <main ref={topRef} className="min-h-50 min-w-full bg-background text-foreground">

      {/* HERO */}
      <section className="relative h-[90vh] min-h-160 w-full overflow-hidden">
        <img
          src={`https://image.tmdb.org/t/p/w1280${details?.backdrop_path}`}
          alt="Movie backdrop"
          width={1920}
          height={1088}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-gradient-hero-side" />

        <div className="relative z-10 h-full flex items-end pb-20 px-6 md:px-12">
          <div className="max-w-2xl animate-fade-in">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary mb-5">
              <span className="h-px w-8 bg-primary" /> Featured Film
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.05] mb-6">
              {details?.title || details?.name}
            </h1>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground mb-7">
              <span className="flex items-center gap-1.5"><Star className="w-4 h-4 fill-primary text-primary" /> <span className="text-foreground font-semibold">{((details?.vote_average/10)*5).toFixed(1)}</span>/10</span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{details?.release_date?.split("-")[0] || details?.first_air_date?.split("-")[0]}</span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
              {details?.runtime && (<><span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {Math.floor((details?.runtime)/60)}hrs {(details?.runtime)%60}mins</span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground/50" /></>)}
              <span className="px-2 py-0.5 border border-border rounded text-xs">PG-13</span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
              {details?.genres?.map((g,i) => (
                <>
                    <span>{g?.name}</span>
                    <span>{i < details?.genres?.length - 1 ? "\u00B7" : ""}</span>
                </>
              ))}

            </div>
            <p
            className={`
                text-base md:text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl
                transition-all duration-500
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
            `}
            >
            {lines[index]}
            </p>
            <div className="flex flex-wrap items-center gap-3">
                <Button onClick={() => {document.getElementById("trailer")?.scrollIntoView({
                    behavior: "smooth"
                    });}} size="lg" className="bg-gradient-orange hover:opacity-90 text-primary-foreground rounded-full px-7 h-12 shadow-glow font-semibold">
                <Play className="w-4 h-4 fill-current" /> Watch Trailer
              </Button>
              <Button size="lg" variant="outline" className="glass rounded-full px-6 h-12 font-medium hover:bg-white/10">
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
            <div className="absolute -inset-2 bg-gradient-orange opacity-0 group-hover:opacity-30 blur-2xl transition duration-500 rounded-3xl" />
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
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-3xl">
              {details?.overview}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[
                ["Director", `${(credits?.crew?.filter(c => c?.job === 'Director'))?.[0]?.name}`],
                ["Language", `${details?.original_language}`],
                ["Status", `${details?.status}`],
                ["Budget", formatNumber(details?.budget)],
              ].map(([k, v]) => (
                <div key={k}>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5">{k}</div>
                  <div className="font-semibold text-foreground">{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CAST */}
      <section className="px-6 md:px-12 mt-24">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">Top Cast</h2>
          <a className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 transition" href="#">Full cast <ChevronRight className="w-4 h-4" /></a>
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
      <section className="px-6 md:px-12 mt-24">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold"> Crew </h2>
          <a className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 transition" href="#">Full crew <ChevronRight className="w-4 h-4" /></a>
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
      <section id="trailer" title={`${videos === undefined || videos?.length === 0 ? "this video is not available" : ""}`} className="relative px-6 md:px-12 mt-24" >
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Official Trailer</h2>
        <div className={`relative rounded-3xl overflow-hidden shadow-card group cursor-pointer h-fit ${videos === undefined || videos?.length === 0 ? "grayscale pointer-events-none" : ""}`}>
            {videos?.length > 0 && (
              (YT && (
                <iframe
                  width={560}
                  height={315}
                  title={videos?.[0]?.name}
                  key={videos?.[0]?.key}
                  src={`https://www.youtube.com/embed/${videos?.[0]?.key}?rel=0${YT ? "&autoplay=1" : ""}` }
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 z-10 object-cover w-full h-full object-center rounded-lg">
                </iframe>
              ))
            )}
          <div className="absolute -inset-1 bg-gradient-orange opacity-30 blur-2xl -z-10" />
          <img src={`https://image.tmdb.org/t/p/w1280${details?.backdrop_path}`} alt="Trailer" width={1920} height={1088} loading="lazy" className="w-full aspect-video object-cover brightness-65 group-hover:brightness-80 transition" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div onClick={() => setYT(true)} className="h-20 w-20 rounded-full bg-gradient-orange flex items-center justify-center shadow-glow group-hover:scale-110 transition">
              <Play className="w-8 h-8 fill-current text-primary-foreground ml-1" />
            </div>
          </div>
          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-widest text-primary mb-1">Trailer</div>
              <div className="text-lg font-bold">{videos?.[0]?.name}</div>
            </div>
            <button className="h-10 w-10 rounded-full glass flex items-center justify-center"><Volume2 className="w-4 h-4" /></button>
          </div>
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
                <div className="text-xs text-muted-foreground">Stream now</div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* RECOMMENDATIONS */}
      <section className="px-6 md:px-12 mt-24 mb-24">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">More Like This</h2>
          <a className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 transition" href="#">View all <ChevronRight className="w-4 h-4" /></a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {similarNullFilter?.slice(0,5)?.map((r, i) => (
            <div key={i} className="group">
              <div className="relative overflow-hidden rounded-2xl mb-3 shadow-card">
                <img src={r?.poster_path ? `https://image.tmdb.org/t/p/w500${r?.poster_path}` : ''}  alt={r.title} width={512} height={768} loading="lazy" className="w-full aspect-2/3 object-cover group-hover:scale-105 transition duration-500" />
                <div className="absolute inset-0 bg-linear-to-t from-background via-background/0 to-background/0 opacity-80" />
                <div className="absolute top-3 left-3 glass rounded-full px-2.5 py-1 flex items-center gap-1 text-xs">
                  <Star className="w-3 h-3 fill-primary text-primary" /> {((r?.vote_average/10)*5).toFixed(1)}
                </div>
                <div onClick={() => navigate(r)} className="absolute bottom-3 right-3 h-10 w-10 rounded-full bg-gradient-orange flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition cursor-pointer">
                  <Play className="w-4 h-4 fill-current text-primary-foreground" />
                </div>
              </div>
              <div className="font-semibold text-sm group-hover:text-primary transition truncate">{r?.title || r?.name}</div>
              <div className="text-xs text-muted-foreground">{r?.release_date?.split("-")[0] || r?.first_air_date?.split("-")[0]}</div>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-border py-8 px-6 md:px-12 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} FilmBase · Built for cinema.
      </footer>
    </main>
  );
};

export default Details;
