import {  MdStar } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const MovieCard = ({data,Key}) => {
    const navigation = useNavigate();
    const navigate = ()=>{
        navigation(`/details/${data.id}/${data.media_type}`)
    }
    
    return(
        <div key={Key} className="w-55 bg-gray-800 hover:shadow-yellow-300 hover:shadow-lg h-fit rounded-tr-2xl rounded-tl-2xl rounded-br-lg rounded-bl-lg p-2 transition-shadow duration-200 space-y-2">
            <div onClick={navigate} className="h-full relative group perspective-near cursor-pointer">
                <img loading="lazy" className="rounded-tl-lg rounded-tr-lg rounded-bl-lg rounded-br-lg w-60 h-fit object-cover object-center group-hover:translate-z-1 transition-transform duration-200" src={`https://image.tmdb.org/t/p/w500${data.poster_path}` || ''} />
                <div className="flex items-center justify-center space-x-1 absolute right-2 top-2 bg-gray-600/80 min-w-12 rounded-lg p-0.5">
                    <p>{<MdStar className="text-yellow-300" size={15}/>}</p>
                    <p className="text-md text-white">{data.vote_average.toFixed(1)}</p>
                </div>
            </div>
            <p className="h-fit line-clamp-1 items-center text-gray-200 w-full font-medium text-lg">{data.title || data.name}</p>
        </div>
    )
}

export default MovieCard;