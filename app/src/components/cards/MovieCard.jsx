import { getPosterSize } from "@/utils/imageSizes";
import { Bookmark, Play, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";


 const MovieCard = ({ movie, genre, index = 0 }) => {
    const navigation = useNavigate();
    const navigate = ()=>{
        navigation(`/details/${movie?.id}/${movie?.media_type}`)
    }

    const rating = ((movie?.vote_average/10)*5).toFixed(1);
  return (
    <article
      className="group relative animate-fade-up"
      style={{ animationDelay: `${Math.min(index * 40, 400)}ms` }}
    >
      <div onClick={navigate} className="relative aspect-2/3 overflow-hidden rounded-2xl bg-surface shadow-card transition-all duration-500 group-hover:scale-[1.04] group-hover:shadow-glow">
        <img
          src={movie?.poster_path ? `https://image.tmdb.org/t/p/${getPosterSize()}${movie?.poster_path}` : ''} 
          alt={`${movie?.title} poster`}
          loading="lazy"
          width={512}
          height={768}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Bottom gradient always visible */}
        <div
          className="absolute -z-10 group-hover:z-10 inset-0 pointer-events-none"
          style={{ background: "var(--gradient-card)" }}
        />

        {/* Rating badge */}
        <div className="absolute top-3 left-3 glass rounded-full px-2.5 py-1 flex items-center gap-1">
          <Star className="h-3 w-3 fill-primary text-primary" />
          <span className="text-xs font-semibold">{rating}</span>
        </div>

        {/* Bookmark */}
        <button
          aria-label="Save to list"
          className="absolute top-3 right-3 h-8 w-8 grid place-items-center rounded-full glass-card text-muted-foreground hover:text-primary transition-colors"
        >
          <Bookmark className="h-4.5 w-4.5" />
        </button>

        {/* Play overlay on hover */}
        <div className="absolute inset-0 grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="h-14 w-14 rounded-full bg-primary/95 grid place-items-center shadow-glow scale-90 group-hover:scale-100 transition-transform duration-300">
            <Play className="h-5 w-5 text-foreground fill-current ml-0.5" />
          </div>
        </div>

        {/* Hover overview */}
        <div className="absolute z-20 inset-x-0 bottom-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
            {movie?.overview}
          </p>
        </div>
      </div>

      <div className="pt-3 px-1">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-display font-semibold text-sm truncate">{movie?.title || movie?.name}</h3>
          <span className="text-xs text-muted/50 dark:text-muted-foreground tabular-nums">{movie?.release_date?.split("-")[0] || movie?.first_air_date?.split("-")[0]}</span>
        </div>
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          {movie?.genre_ids?.slice(0, 2)?.map((g) => {
            const name = genre?.find(n => n?.id === g)
            if(!name) return null;
            return <span
              key={g}
              className="text-[10px] font-medium uppercase tracking-wider text-background dark:text-muted-foreground border border-muted/50 dark:border-border rounded-full px-2 py-0.5"
            >
              {name?.name}
            </span>
            })}
        </div>
      </div>
    </article>
  );
};
export default MovieCard;