import { useNavigate } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

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
                        <img loading="lazy" className="w-full h-[94vh] rounded-xs object-cover opacity-60" src={d.backdrop_path ? `https://image.tmdb.org/t/p/w1280${d.backdrop_path}` : ""} alt=""/>
                        <div className="absolute top-0 left-12 h-full">
                            <div className="flex items-center gap-2 text-white pt-2">
                                <div className="text-2xl">Title</div>  
                                <p>:</p>
                                <div className="underline pl-1 text-2xl">{d?.name || d?.title}</div>
                            </div>
                            <div className="text-white lg:w-100 w-70 min-h-40 max-h-full rounded-lg pt-2 space-y-2 cursor-default">
                                <p title={d?.overview} className="text-md font-mono line-clamp-6 mt-5">{d?.overview}</p>
                            </div>
                            <br />
                            <div className="flex gap-2 flex-wrap w-100">
                                {d?.genre_ids?.map(g => {
                                    const name = genres?.find(G => G?.id === g);
                                    if(!name) return null;
                                    return <p key={g} className="text-white bg-gray-500/75 rounded-md px-2 w-fit">{name?.name}</p>;
                                })}
                            </div>
                            <br />
                            <button onClick={() => navigateTo(d)} className="bg-[#FF3C00] min-w-20 h-14 p-2 rounded-lg text-white">Details</button>
                        </div>
                    </div>
                </CarouselItem>
            ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}

export default CarouselComponent;