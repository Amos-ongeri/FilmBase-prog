import { useEffect, useRef, useState } from "react";
import { MdPlayArrow } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Carousel = ({data,genres})=>{
    const carouselRef = useRef();
    const [index, setIndex] = useState(0);
    
    useEffect(()=>{
        if(!carouselRef?.current) return;
        const interval = setInterval(()=>{
            setIndex(prev=> (prev + 1) % carouselRef?.current?.children.length)
        },5000)

        return ()=> clearInterval(interval)
    },[])

    const navigate = useNavigate()

    const navigateTo = (d)=>{
        navigate(`/details/${d?.id}/${d?.media_type}`)
    }
    

    return(
        <div className="w-full pl-15 pr-10 h-140 overflow-hidden">
            <div ref={carouselRef} className="flex w-full h-full border" style={{ transform: `translateX(-${index * 100}%)`, transition: 'transform', transitionDuration: '.2s'}}>
                {data?.map((d, i)=>(
                    d?.media_type  === 'movie' && (
                        <div key={i} className="shrink-0 w-full h-full px-2">
                        <img loading="lazy" className="w-full h-[85%] rounded-lg object-cover object-center " src={`https://image.tmdb.org/t/p/w1280${d.backdrop_path}` || ''} />
                        <div className="flex justify-between p-3 h-[15%]">
                            <div>
                                <p className="text-white drop-shadow-lg text-2xl w-70 min-h-10  line-clamp-2">{d?.title || d?.name}</p>
                                <div className="flex gap-2  flex-wrap w-70 min-h-10 ">
                                    {
                                        d?.genre_ids?.map((G,i)=>{
                                            const name = genres?.find(n=> n.id === G)
                                            if(!name) return null;
                                            return  <p key={G} className="text-white bg-gray-500/75 rounded-md px-2 w-fit">{name?.name}</p>;
                                        })
                                    }
                                </div>
                            </div>
                            <button onClick={()=>navigateTo(d)} className="h-10 p-3 text-white text-lg bg-blue-500 hover:bg-blue-600 rounded-lg cursor-pointer flex items-center space-x-1">
                                <p>{<MdPlayArrow/>}</p>
                                <p>watch trailer</p>
                            </button>
                        </div>
                    </div>
                    )
            ))}
            </div>
        </div>
    )
}

export default Carousel;