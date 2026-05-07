import { Bookmark, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const MovieCard3 = ({ t, k}) => {
  const navigation = useNavigate();
    const navigate = ()=>{
        navigation(`/details/${t?.id}/${t?.media_type}`)
    }
  return (
  <div key={k} className="group block">
    <div onClick={navigate} className="relative overflow-hidden rounded-2xl mb-3 shadow-card">
      <img
        src={`https://image.tmdb.org/t/p/w500${t?.poster_path}`}
        alt={t?.title || t?.name}
        loading="lazy"
        className="w-full  object-cover group-hover:scale-105 transition duration-500"
      />
      <button
          aria-label="Save to list"
          className="absolute top-3 right-3 h-8 w-8 grid place-items-center rounded-full glass-card text-muted-foreground hover:text-primary transition-colors"
        >
          <Bookmark className="h-3.5 w-3.5" />
        </button>
      <div className="absolute inset-0 bg-linear-to-t from-background via-background/0 to-background/0 opacity-80" />
      <div className="absolute top-3 left-3 glass dark:text-foreground text-background rounded-full px-2.5 py-1 flex items-center gap-1 text-xs">
        <Star className="w-3 h-3 fill-primary text-primary" /> {((t?.vote_average/10)*5).toFixed(1)}
      </div>
    </div>
    <div className="font-semibold text-sm group-hover:text-primary text-background dark:text-foreground transition truncate">{t?.title || t?.name}</div>
    <div className="text-xs text-background dark:text-muted-foreground">
      {t?.release_date?.split("-")[0] || t?.first_air_date?.split("-")[0]}
    </div>
  </div>
)
};