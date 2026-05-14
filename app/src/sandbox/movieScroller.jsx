import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MovieCard3 } from "../components/cards/MovieCard3";
import { ArrowLeft, ArrowRight } from "lucide-react";

const MovieScroller = ({data})=>{
    const containerRef = useRef(null)
    const navigation = useNavigate()

    const handleScrollRight = ()=>{
        containerRef.current.scrollBy({ left: 150, behavior: 'smooth' });
    }
    const handleScrollLeft = ()=>{
        containerRef.current.scrollBy({ left: -150, behavior: 'smooth' });
    }
    const navigate = (content)=>{
        navigation('/details', {state: {content}})
    }
    return(
        <div className="relative max-w-full min-h-50 space-y-2 mb-28">
            <button onClick={handleScrollLeft} className="absolute left-5 top-1/2 z-10 w-10 h-10 bg-gray-200 rounded-full shadow-md flex items-center justify-center flex-col text-black font-bold cursor-pointer hover:opacity-60 transition-opacity duration-100 ease-in">
                <p className="text-2xl">{<ArrowLeft />}</p>
            </button>
            <button onClick={handleScrollRight} className="absolute right-5 top-1/2 z-10 w-10 h-10 bg-gray-200  rounded-full shadow-md flex items-center justify-center flex-col text-black font-bold cursor-pointer hover:opacity-60 transition-opacity duration-100 ease-in">
                <p className="text-2xl">{<ArrowRight />}</p>
            </button>
            <div ref={containerRef} className="flex shrink-0 items-center gap-4 no-scrollbar h-full w-full">
                {data.map((item, i)=>(
                    <div key={i} onClick={()=> navigate(item)} className="w-40 cursor-pointer">
                        <MovieCard3 t={item}/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MovieScroller;