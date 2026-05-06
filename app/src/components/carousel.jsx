import { useNavigate } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "../../node_modules/embla-carousel-autoplay"
import { Star } from "lucide-react";

const CarouselComponent = ({data,genres})=>{

    const navigate = useNavigate()

    const navigateTo = (d)=>{
        navigate(`/details/${d?.id}/${d?.media_type}`)
    }

    return(
        <Carousel
            plugins={[
                Autoplay({
                    delay: 10000,
                })
            ]}
            opts={{
                loop: true
            }}
        >
            <CarouselContent>
                {data?.map((d,i) => (
                <CarouselItem key={i}>
                    <div className="relative">
                        <img loading="lazy" className="w-full h-screen rounded-xs object-cover" src={d.backdrop_path ? `https://image.tmdb.org/t/p/w1280${d.backdrop_path}` : ""} alt=""/>
                        <div className="absolute inset-0 flex items-end">
                            {/* gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-hero" />

                            <div className="relative z-10 p-6 lg:p-12 max-w-2xl text-white space-y-4">
    
                                {/* title */}
                                <h1 className="text-3xl lg:text-5xl font-bold leading-tight text-background dark:text-foreground">
                                {d?.name || d?.title}
                                </h1>

                                {/* meta info */}
                                <div className="flex items-center gap-3 text-sm text-gray-300">
                                <Star className="h-3 w-3 fill-primary text-primary" />
                                <span className="text-background dark:text-foreground"> {d?.vote_average?.toFixed(1)}</span>
                                <span className="w-1 h-1 rounded-full bg-background dark:bg-muted-foreground/50" />
                                <span className="text-background dark:text-foreground">{d?.release_date?.split("-")[0] || d?.first_air_date?.split("-")[0]}</span>
                                <span className="w-1 h-1 rounded-full bg-background dark:bg-muted-foreground/50" />
                                <span className="uppercase text-background dark:text-foreground">{d?.media_type}</span>
                                </div>

                                {/* genres */}
                                <div className="flex flex-wrap gap-2">
                                {d?.genre_ids?.map((g) => {
                                    const name = genres?.find((G) => G?.id === g);
                                    if (!name) return null;

                                    return (
                                    <span
                                        key={g}
                                        className="text-xs glass px-3 py-1 rounded-full border border-white/20 text-background dark:text-foreground"
                                    >
                                        {name?.name}
                                    </span>
                                    );
                                })}
                                </div>

                                {/* overview */}
                                <p className="text-sm lg:text-base line-clamp-4 leading-relaxed text-background dark:text-foreground">
                                {d?.overview}
                                </p>

                                {/* actions */}
                                <div className="flex items-center gap-4 pt-2">
                                <button
                                    onClick={() => navigateTo(d)}
                                    className="bg-[#FF3C00] hover:bg-[#ff521f] transition-colors px-6 py-3 rounded-xl font-semibold shadow-lg"
                                >
                                    View Details
                                </button>

                                {/* optional secondary button */}
                                <button className="bg-white/10 hover:bg-white/20 transition px-5 py-3 rounded-xl glass border border-white/20 text-background dark:text-foreground">
                                    + Watchlist
                                </button>
                                </div>
                            </div>
                            </div>
                    </div>
                </CarouselItem>
            ))}
            </CarouselContent>
            <CarouselPrevious variant="myvar"/>
            <CarouselNext variant="myvar"/>
        </Carousel>
    )
}

export default CarouselComponent;