import MovieCard from "../components/MovieCard";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { PiGreaterThanBold, PiLessThanBold } from "react-icons/pi";

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
        <div className="relative max-w-screen min-h-56 space-y-2 mb-28">
            <p className="text-white text-2xl ml-5">anime</p>
            <button onClick={handleScrollLeft} className="absolute left-5 top-1/2 z-10 w-10 h-10 bg-gray-200 rounded-full shadow-md flex items-center justify-center flex-col text-black font-bold cursor-pointer hover:opacity-60 transition-opacity duration-100 ease-in">
                <p className="text-2xl">{<PiLessThanBold />}</p>
            </button>
            <button onClick={handleScrollRight} className="absolute right-5 top-1/2 z-10 w-10 h-10 bg-gray-200  rounded-full shadow-md flex items-center justify-center flex-col text-black font-bold cursor-pointer hover:opacity-60 transition-opacity duration-100 ease-in">
                <p className="text-2xl">{<PiGreaterThanBold />}</p>
            </button>
            <div ref={containerRef} className="flex gap-4 overflow-x-hidden overflow-y-hidden no-scrollbar h-60 max-w-screen">
                {data.map((item, i)=>(
                    <div key={i} onClick={()=> navigate(item)} className="cursor-pointer">
                        <MovieCard name={item.title} path={item.poster.url}/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MovieScroller;