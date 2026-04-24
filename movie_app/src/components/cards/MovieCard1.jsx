import { CiBookmark } from "react-icons/ci";
import {  MdStar } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const MovieCard1 = ({data,Key}) => {
    const navigation = useNavigate();
    const navigate = ()=>{
        navigation(`/details/${data?.id}/${data?.media_type}`)
    }

    return(
        <div key={Key}  className="lg:w-55 lg:h-80 md:w:45 md:h-50 sm:w-40 sm:h-60 rounded-lg transition-shadow duration-200 space-y-2">
            <div className="h-[90%] w- relative group perspective-near overflow-hidden rounded-lg">
                <img onClick={navigate} loading="lazy" className="rounded-lg w-60 h-full object-cover object-center group-hover:translate-z-3 hover:opacity-70 transition-all duration-200 cursor-pointer opacity-85" src={data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : ''} />
                <div className="flex space-x-2 absolute right-2 top-2">
                    <CiBookmark className="cursor-pointer" fill="white" size={25}/>
                    <div className="flex items-center justify-center space-x-1 bg-gray-600/80 min-w-12 rounded-lg p-0.5">
                        <p>{<MdStar className="text-yellow-300" size={15}/>}</p>
                        <p className="text-md text-white">{data.vote_average.toFixed(1)}</p>
                    </div>
                </div>
            </div>
            <p title={data.title || data.name} className="h-[10%] line-clamp-1 items-center text-gray-200 w-full font-medium text-lg">{data.title || data.name}</p>
        </div>
    )
}

export default MovieCard1;