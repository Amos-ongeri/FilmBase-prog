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
import { getBackdropSize, getPosterSize } from "@/utils/imageSizes";

const CarouselComponent = ({data,genres, variant = "movies" })=>{

    const navigate = useNavigate()

    const navigateTo = (d)=>{
        navigate(`/details/${d?.id}/${d?.media_type}`)
    }

    const variants = {
  trending: {
    card: "w-[220px] md:w-[280px] scale-[1.02] hover:scale-105",
    glow: "shadow-[0_0_40px_rgba(255,0,80,0.25)]",
    overlay: "bg-gradient-to-t from-black/80 via-black/20",
  },

  movies: {
    card: "w-[160px] md:w-[180px] hover:scale-105",
    glow: "hover:shadow-xl",
    overlay: "bg-black/40",
  },

  tv: {
    card: "w-[140px] md:w-[160px] rounded-xl hover:scale-105",
    glow: "hover:shadow-md",
    overlay: "bg-gradient-to-b from-black/60",
  },
};

const style = variants[variant];

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
                <CarouselItem key={i} className='md:basis-1/3'>
                    <div className="relative h-70">
                        <img loading="lazy" className="w-full h-full rounded-xs object-center object-cover" src={d.backdrop_path ? `https://image.tmdb.org/t/p/${getPosterSize()}${d.poster_path}` : ""} alt=""/>
                        <div className="absolute inset-0 flex items-end">
                            {/* gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-hero" />
                            <div className="absolute inset-0 bg-gradient-hero-side  " />

                            <div className="relative z-10 p-2 lg:p-4 max-w-2xl text-white space-y-4">

                                {/* title */}
                                <h1 className="text-3xl lg:text-2xl font-bold leading-tight text-background dark:text-foreground transition duration-150">
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
                                        className="text-xs glass px-3 py-1 rounded-full border border-white/20 text-background dark:text-foreground transition duration-150"
                                    >
                                        {name?.name}
                                    </span>
                                    );
                                })}
                                </div>

                                {/* overview */}
                                <p title={`${d?.overview}`} className="text-sm lg:text-base line-clamp-4 leading-relaxed text-background dark:text-foreground ">
                                {d?.overview}
                                </p>

                                {/* actions */}
                                <div className="flex items-center gap-4 pt-2">
                                <button
                                    onClick={() => navigateTo(d)}
                                    className="bg-[#FF3C00] hover:bg-[#ff521f] transition-colors px-4 py-2 rounded-xl font-semibold shadow-lg"
                                >
                                    View Details
                                </button>

                                {/* optional secondary button */}
                                <button className="bg-white/10 hover:bg-white/20 transition duration-150 px-4 py-2 rounded-xl glass border border-white/20 text-background dark:text-foreground">
                                    + Watchlist
                                </button>
                                </div>
                            </div>
                            </div>
                    </div>
                </CarouselItem>
            ))}
            </CarouselContent>
            <div className="absolute right-1/8 top-1/8 py-6 lg:py-12 -translate-x-1/4 space-x-5">
                <CarouselPrevious variant="myvar"/>
                <CarouselNext variant="myvar"/>
            </div>
        </Carousel>
    )
}

export const BackdropsCarousel = ({backdrops}) => {
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
            {backdrops?.map((b,i) => (
                <CarouselItem className="basis-1/1 md:basis-1/3" key={i}><img loading="lazy" className="h-full object-cover" src={`https://image.tmdb.org/t/p/${getBackdropSize()}${b.file_path}`} alt="image" /></CarouselItem>
            ))}
            </CarouselContent>
            <CarouselPrevious variant="newVar" className="absolute top-1/2 left-1 -translate-y-1/2"/>
            <CarouselNext variant="newVar" className="absolute top-1/2 right-1 -translate-y-1/2"/>
        </Carousel>
    )
}

export const PostersCarousel = ({posters}) => {
    return(
        <Carousel
            plugins={[
                Autoplay({
                    delay: 8000,
                })
            ]}
            opts={{
                loop: true
            }}
        >
            <CarouselContent>
            {posters?.map((b,i) => (
                <CarouselItem className="basis-1/2 md:basis-1/4" key={i}><div className="h-full"><img loading="lazy" className="h-full object-cover" src={`https://image.tmdb.org/t/p/${getPosterSize()}${b.file_path}`} alt="image" /></div></CarouselItem>
            ))}
            </CarouselContent>
            <CarouselPrevious variant="newVar" className="absolute top-1/2 left-1 -translate-y-1/2"/>
            <CarouselNext variant="newVar" className="absolute top-1/2 right-1 -translate-y-1/2"/>
        </Carousel>
    )
}

export default CarouselComponent;