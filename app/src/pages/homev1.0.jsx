import { Link } from "react-router-dom";
import { Play, Star, ChevronRight, TrendingUp, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getMovieGenres, getTrending, getTv } from "@/services/api";
import { getBackdropSize } from "@/utils/imageSizes";
import { Spinner } from "@/components/ui/spinner";
import { MovieCard3 } from "@/components/cards/MovieCard3";
import { getFeaturedMovie } from "@/utils/featured";
import MovieScroller from "@/components/movieScrollerv1.0";

const HomePage = () => {
    const [tv, setTv] = useState({});
    const [movies, setMovies] = useState([])
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const data = await getTv();

            setTv(data);
        }
        getData();
    },[])

    useEffect(() => {
    const initMovieGenres = async () => {
      const gen = await getMovieGenres();
      setGenres(gen);
    }
    initMovieGenres()
  },[])

    useEffect(() => {
        const getData = async () => {
            const data = await getTrending("movie", "week");

            setMovies(data);
        }
        getData();
    },[])

    const featured = getFeaturedMovie(movies);

    const trending = [...(movies || [])].sort((a, b) => b.rating - a.rating);

    const newSeries = tv?.airing_today?.results?.slice(0, 6);
  return (
    <main className="min-h-screen dark:bg-background dark:text-foreground text-background bg-foreground">

      {/* HERO */}
      <section className="relative h-[88vh] min-h-150 w-full overflow-hidden">
        <img src={featured?.backdrop_path ? `https://image.tmdb.org/t/p/${getBackdropSize()}${featured?.backdrop_path}` : ""} alt="Featured" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="relative z-10 h-full flex items-end pb-20 px-6 md:px-12">
          <div className="max-w-2xl animate-fade-in">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary mb-5">
              <Sparkles className="w-3.5 h-3.5" /> Featured this week
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.05] mb-6">
              {featured?.title.split(" ").slice(0, -1).join(" ")}{" "}
              <span className="text-primary">{featured?.title.split(" ").slice(-1)}</span>
            </h1>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm dark:text-muted-foreground text-muted mb-7">
              <span className="flex items-center gap-1.5 text-muted dark:text-foreground">
                <Star className="w-4 h-4 fill-primary text-primary" />
                <span className="dark:text-foreground text-background font-semibold">{((featured?.vote_average/10)*5).toFixed(1)}</span>/10
              </span>
              <span className="w-1 h-1 rounded-full dark:bg-muted-foreground/50 bg-muted" />
              <span>{featured?.release_date?.split("-")[0]}</span>
              <span className="w-1 h-1 rounded-full dark:bg-muted-foreground/50 bg-muted" />
              {featured?.genre_ids?.map((g,i) => {
                const name = genres?.find(ge => ge.id === g)

                if(!name) return null

                return <span key={i}>{name?.name}</span>
              })}
            </div>

            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-primary hover:opacity-90 text-primary-foreground rounded-full px-7 h-12 shadow-glow font-semibold">
                <Link to={`/details/${featured?.id}/movie`}>
                  <Play className="w-4 h-4 fill-current" /> View Details
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY PILLS */}
      <section className="px-6 md:px-12 -mt-12 relative z-20">
        <div className="flex gap-3 flex-wrap overflow-x-auto scrollbar-hide pb-2">
          {genres.map((g) => (
            <Link
              key={g}
              to={`/movies?genre=${g?.name}`}
              className="glass rounded-full px-5 py-2.5 text-sm whitespace-nowrap hover:border-primary hover:text-primary transition"
            >
              {g?.name}
            </Link>
          ))}
        </div>
      </section>

      {/* TRENDING */}
      <section className="px-6 md:px-12 mt-16">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-primary" /> Trending Movies
          </h2>
          <Link to="/movies" className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 transition">
            View all <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <MovieScroller data={trending} />
        {/* {!trending ? (<div className="flex items-center justify-center"><Spinner /></div>) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
                {trending?.map((t) => <MovieCard3 key={t.id} t={{...t, media_type: "movie"}} />)}
            </div>
        )} */}
      </section>

      {/* NEW SERIES */}
      <section className="px-6 md:px-12 mt-20 mb-24">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">New Series</h2>
          <Link to="/tv" className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 transition">
            Browse series <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        {!newSeries ? (<div className="flex items-center justify-center"><Spinner /></div>) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
                {newSeries?.map((t) => <MovieCard3 key={t.id} t={{...t, media_type: "tv"}} />)}
            </div>
        )}
      </section>

      <footer className="border-t border-border py-8 px-6 md:px-12 text-center text-xs text-muted dark:text-foreground">
        © {new Date().getFullYear()} FilmBase · built for cinema
      </footer>
    </main>
  );
};

export default HomePage;
