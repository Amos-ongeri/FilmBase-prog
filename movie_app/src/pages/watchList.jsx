import { useEffect, useMemo, useRef, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  Star,
  Clock,
  Calendar,
  Play,
  Trash2,
  Bookmark,
  ChevronDown,
  LayoutGrid,
  List as ListIcon,
  Film,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel
} from "@/components/ui/select";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";


const ALL_GENRES = ["All", "Sci-Fi", "Drama", "Thriller", "Adventure", "Mystery", "Action"];
const ALL_PLATFORMS = ["All", "Netflix", "Prime Video", "Disney+", "Apple TV+", "Max", "Hulu"];


const platformBadge = (p) => p[0];

const WatchList = () => {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("All");
  const [platform, setPlatform] = useState("All");
  const [minRating, setMinRating] = useState("0");
  const [sort, setSort] = useState("added-desc");
  const [view, setView] = useState("grid");
  const [items, setItems] = useState();

  const filtered = useMemo(() => {
    let list = items?.filter((m) => {
      if (query && !m.title.toLowerCase().includes(query.toLowerCase())) return false;
      if (genre !== "All" && m.genre !== genre) return false;
      if (platform !== "All" && !m.platforms.includes(platform)) return false;
      if (m.rating < Number(minRating)) return false;
      return true;
    });
    list = [...list || []].sort((a, b) => {
      switch (sort) {
        case "added-desc": return +new Date(b.added) - +new Date(a.added);
        case "added-asc": return +new Date(a.added) - +new Date(b.added);
        case "rating-desc": return b.rating - a.rating;
        case "title-asc": return a.title.localeCompare(b.title);
        case "year-desc": return b.year - a.year;
      }
    });
    return list;
  }, [items, query, genre, platform, minRating, sort]);

  const totalRuntime = filtered.reduce((s, m) => s + m.runtime, 0);
  const hours = Math.floor(totalRuntime / 60);
  const minutes = totalRuntime % 60;

  const remove = (id) => setItems((prev) => prev.filter((m) => m.id !== id));
  const clearFilters = () => {
    setQuery(""); setGenre("All"); setPlatform("All"); setMinRating("0");
  };
  const hasActiveFilters = query || genre !== "All" || platform !== "All" || minRating !== "0";

  const topRef = useRef();
          
  useEffect(() => {
      topRef?.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  },[])

  return (
    <main ref={topRef} className="min-h-50 min-w-full text-foreground bg-background">
      {/* Hero / page header */}
      <section className="relative px-6 md:px-12 pt-14 pb-10 overflow-hidden">
        <div
          className="absolute inset-0 -z-10 opacity-30"
          style={{
            // backgroundImage: `url(${})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(60px)",
          }}
        />
        <div className="absolute inset-0 -z-10 bg-linear-to-b from-background/60 via-background/90 to-background" />

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 animate-fade-in">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary mb-4">
              <Bookmark className="w-3.5 h-3.5" /> Your Collection
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.05] mb-4">
              Watch <span className="text-gradient-orange">Later</span>
            </h1>
            <p className="text-muted-foreground max-w-xl">
              Films you've saved to revisit. Track where each one is streaming and dive in when you're ready.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="glass rounded-2xl px-5 py-4 min-w-30">
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Saved</div>
              <div className="text-2xl font-bold">{items?.length}</div>
            </div>
            <div className="glass rounded-2xl px-5 py-4 min-w-30">
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Runtime</div>
              <div className="text-2xl font-bold">{hours}h {minutes}m</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters & sort bar */}
      <section className="px-6 md:px-12 sticky top-0 z-20 bg-background/80 backdrop-blur-xl py-4 border-y border-border/50">
        <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center">
          {/* Search */}
          <div className="relative flex-1 min-w-55">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search your watch list…"
              className="pl-10 h-11 rounded-full bg-secondary/60 border-border focus-visible:ring-primary"
            />
          </div>

          {/* Genre */}
          <Select>
            <SelectTrigger className="h-11 w-full lg:w-40 rounded-full bg-secondary/60 border-border">
              <div className="flex items-center w-full gap-2">
                <Film className="w-4 h-4 text-primary" />
                <SelectValue placeholder="All" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {ALL_GENRES?.map(g => (
                  <SelectItem key={g} value={g}>{g}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* Platform */}
          <Select>
            <SelectTrigger className="h-11 w-full lg:w-40 rounded-full bg-secondary/60 border-border">
              <div className="flex items-center w-full gap-2">
                <SelectValue placeholder="All" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {ALL_PLATFORMS?.map(p => (
                  <SelectItem key={p} value={p}>{p}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* Sort */}
          <Select>
            <SelectTrigger className="h-11 w-full lg:w-40 rounded-full bg-secondary/60 border-border">
              <div className="flex items-center w-full gap-2">
                <SlidersHorizontal className="w-4 h-4 text-primary"   />
                <SelectValue placeholder="All" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="added-desc">Recently added</SelectItem>
                <SelectItem value="added-asc">Oldest added</SelectItem>
                <SelectItem value="rating-desc">Highest rated</SelectItem>
                <SelectItem value="year-desc">Newest release</SelectItem>
                <SelectItem value="title-asc">Title (A–Z)</SelectItem>
                </SelectGroup>
            </SelectContent>
          </Select>

          {/* View toggle */}
          <div className="glass rounded-full p-1 flex items-center">
            <button
              onClick={() => setView("grid")}
              className={`h-9 w-9 rounded-full flex items-center justify-center transition ${view === "grid" ? "bg-gradient-orange text-primary-foreground shadow-glow" : "text-muted-foreground hover:text-foreground"}`}
              aria-label="Grid view"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setView("list")}
              className={`h-9 w-9 rounded-full flex items-center justify-center transition ${view === "list" ? "bg-gradient-orange text-primary-foreground shadow-glow" : "text-muted-foreground hover:text-foreground"}`}
              aria-label="List view"
            >
              <ListIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Active chips */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 mt-3">
            <span className="text-xs uppercase tracking-wider text-muted-foreground mr-1">Active:</span>
            {query && <Chip label={`"${query}"`} onClear={() => setQuery("")} />}
            {genre !== "All" && <Chip label={genre} onClear={() => setGenre("All")} />}
            {platform !== "All" && <Chip label={platform} onClear={() => setPlatform("All")} />}
            {minRating !== "0" && <Chip label={`${minRating}+ rating`} onClear={() => setMinRating("0")} />}
            <button onClick={clearFilters} className="text-xs text-primary hover:underline ml-1">Clear all</button>
          </div>
        )}
      </section>

      {/* Results */}
      <section className="px-6 md:px-12 py-10">
        <div className="flex items-center justify-between mb-6">
          <div className="text-sm text-muted-foreground">
            Showing <span className="text-foreground font-semibold">{filtered?.length}</span> of {items?.length} films
          </div>
        </div>

        {filtered.length === 0 ? (
          <EmptyState onClear={clearFilters} />
        ) : view === "grid" ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filtered.map((m) => <PosterCard key={m.id} m={m} onRemove={remove} />)}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filtered.map((m) => <RowCard key={m.id} m={m} onRemove={remove} />)}
          </div>
        )}
      </section>

      <footer className="border-t border-border py-8 px-6 md:px-12 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} FilmBase · made for cinema
      </footer>
    </main>
  );
};

const Chip = ({ label, onClear }) => (
  <span className="inline-flex items-center gap-1.5 glass rounded-full pl-3 pr-1.5 py-1 text-xs">
    {label}
    <button onClick={onClear} className="h-5 w-5 rounded-full flex items-center justify-center hover:bg-white/10">
      <X className="w-3 h-3" />
    </button>
  </span>
);

const PlatformPill = ({ name }) => (
  <span className="inline-flex items-center gap-1.5 glass rounded-full pl-1 pr-2.5 py-1 text-[11px]">
    <span className="h-5 w-5 rounded-full bg-gradient-orange/20 border border-primary/30 text-primary text-[10px] font-bold flex items-center justify-center">
      {platformBadge(name)}
    </span>
    {name}
  </span>
);

const PosterCard = ({ m, onRemove }) => (
  <div className="group cursor-pointer animate-fade-in">
    <div className="relative overflow-hidden rounded-2xl mb-3 shadow-card">
      <img
        src={m.poster}
        alt={m.title}
        loading="lazy"
        className="w-full aspect-2/3 object-cover group-hover:scale-105 transition duration-500"
      />
      <div className="absolute inset-0 bg-linear-to-t from-background via-background/10 to-transparent opacity-90" />
      <div className="absolute top-3 left-3 glass rounded-full px-2.5 py-1 flex items-center gap-1 text-xs">
        <Star className="w-3 h-3 fill-primary text-primary" /> {m.rating}
      </div>
      <button
        onClick={(e) => { e.stopPropagation(); onRemove(m.id); }}
        className="absolute top-3 right-3 h-8 w-8 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition hover:bg-destructive/80"
        aria-label="Remove"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
        <div className="text-[11px] text-muted-foreground flex items-center gap-2">
          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {m.year}</span>
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {m.runtime}m</span>
        </div>
        <div className="h-9 w-9 rounded-full bg-gradient-orange flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition shadow-glow">
          <Play className="w-3.5 h-3.5 fill-current text-primary-foreground" />
        </div>
      </div>
    </div>
    <div className="font-semibold text-sm group-hover:text-primary transition truncate">{m.title}</div>
    <div className="text-xs text-muted-foreground mb-2">{m.genre}</div>
    <div className="flex flex-wrap gap-1.5">
      {m.platforms.slice(0, 2).map((p) => <PlatformPill key={p} name={p} />)}
      {m.platforms.length > 2 && (
        <span className="text-[11px] text-muted-foreground self-center">+{m.platforms.length - 2}</span>
      )}
    </div>
  </div>
);

const RowCard = ({ m, onRemove }) => (
  <div className="glass rounded-2xl p-3 md:p-4 flex gap-4 group hover:border-primary/40 transition animate-fade-in">
    <img
      src={m.poster}
      alt={m.title}
      loading="lazy"
      className="w-20 h-28 md:w-24 md:h-32 object-cover rounded-xl shrink-0"
    />
    <div className="flex-1 min-w-0 flex flex-col">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="font-semibold truncate group-hover:text-primary transition">{m.title}</div>
          <div className="flex items-center gap-x-3 gap-y-1 flex-wrap text-xs text-muted-foreground mt-1">
            <span className="flex items-center gap-1"><Star className="w-3 h-3 fill-primary text-primary" /> <span className="text-foreground font-semibold">{m.rating}</span></span>
            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {m.year}</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {m.runtime}m</span>
            <span className="px-1.5 py-0.5 border border-border rounded text-[10px]">{m.genre}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Button size="sm" className="bg-gradient-orange hover:opacity-90 text-primary-foreground rounded-full h-9 px-4 shadow-glow">
            <Play className="w-3.5 h-3.5 fill-current" /> Watch
          </Button>
          <button
            onClick={() => onRemove(m.id)}
            className="h-9 w-9 rounded-full glass flex items-center justify-center hover:bg-destructive/80 transition"
            aria-label="Remove"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
      <div className="mt-auto pt-3 flex flex-wrap gap-1.5">
        <span className="text-[11px] uppercase tracking-wider text-muted-foreground self-center mr-1">On</span>
        {m.platforms.map((p) => <PlatformPill key={p} name={p} />)}
      </div>
    </div>
  </div>
);

const EmptyState = ({ onClear }) => (
  <div className="glass rounded-3xl py-20 px-6 text-center max-w-xl mx-auto animate-fade-in">
    <div className="h-16 w-16 rounded-full bg-gradient-orange/20 border border-primary/30 flex items-center justify-center mx-auto mb-5">
      <Bookmark className="w-7 h-7 text-primary" />
    </div>
    <h3 className="text-xl font-bold mb-2">No films match your filters</h3>
    <p className="text-sm text-muted-foreground mb-6">Try loosening up the genre, platform, or rating to see more.</p>
    <Button onClick={onClear} className="bg-gradient-orange hover:opacity-90 text-primary-foreground rounded-full px-6 shadow-glow">
      Clear filters
    </Button>
  </div>
);

export default WatchList;
