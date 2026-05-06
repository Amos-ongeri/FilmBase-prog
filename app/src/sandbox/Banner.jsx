import { useEffect,useState } from "react"
import { MdPlayArrow } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Banner = ({data,genres})=>{
    const [index,setIndex] = useState(0)
    console.log('g: ',genres);
    
    let sliced;
    if(data){
        sliced = data.slice(0,10)
        console.log('sliced: ', sliced);
    }
    
    
    useEffect(()=>{
        if(!sliced?.length) return;
        const interval = setInterval(()=> setIndex(prev=>(prev += 1) % sliced.length),10000)

        return ()=> clearInterval(interval);
    },[data])

    const navigate = useNavigate()

    const navigateTo = ()=>{
        navigate(`/details/${sliced?.[index]?.id}/${sliced?.[index]?.media_type}`)
    }
    return(
        <div key={sliced?.[index]?.id} className="relative h-130 overflow-hidden w-full mask-b-from-50%">
            <div className="w-full min-h-full">
                {sliced && sliced.length > 0 && sliced[index] &&  (
                <img loading="lazy" key={sliced[index]?.id} className="w-full h-full object-contain mask-l-from-40%" src={`https://image.tmdb.org/t/p/w1280${sliced[index]?.backdrop_path}`} />
                )}
            </div>
            <div className="absolute flex space-x-3 left-6 top-10 w-fit">
                <img loading="lazy" key={sliced?.[index]?.id} className="w-60 h-fit object-fit rounded-lg border border-gray-300/30" src={`https://image.tmdb.org/t/p/w1280${sliced?.[index]?.poster_path}`} />
                <div className="h-[85%]">
                    <p className="text-white drop-shadow-lg text-4xl w-70 min-h-10 mb-2">{sliced?.[index]?.title || sliced?.[index]?.name}</p>
                    <p className="text-white text-lg line-clamp-3 mb-3 drop-shadow-lg w-100">{sliced?.[index]?.overview}</p>
                    <div className="flex gap-2 flex-wrap w-100">
                        {
                            data?.[index]?.genre_ids?.map((G,i)=>{
                                const name = genres?.find(n=> n.id === G)
                                if(!name) return null;
                                return  <p key={G} className="text-white bg-gray-500/75 rounded-md px-2 w-fit">{name?.name}</p>;
                            })
                        }
                    </div>
                    <br />
                    <button onClick={navigateTo} className="p-3 text-white text-lg bg-blue-500 hover:bg-blue-600 rounded-lg cursor-pointer flex items-center space-x-1">
                        <p>{<MdPlayArrow/>}</p>
                        <p>watch trailer</p>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Banner;