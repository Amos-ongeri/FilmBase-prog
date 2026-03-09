import {  MdStar } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const MovieCard1 = ({data,Key}) => {
    const navigation = useNavigate();
    const navigate = ()=>{
        navigation(`/details/${data?.id}/${data?.media_type}`)
    }
    
    return(
        <div key={Key} className="w-55 h-fit rounded-lg transition-shadow duration-200 space-y-2">
            <div className="h-fit w- relative group perspective-near overflow-hidden rounded-lg">
                <img onClick={navigate} title={data?.release_date?.split("-")[0] || data?.first_air_date?.split("-")[0] || '-'} loading="lazy" className="rounded-lg w-60 h-fit object-cover object-center group-hover:translate-z-3 transition-transform duration-200 cursor-pointer" src={`https://image.tmdb.org/t/p/w500${data.poster_path}` || ''} />
                <div className="flex items-center justify-center space-x-1 absolute right-2 top-2 bg-gray-600/80 min-w-12 rounded-lg p-0.5">
                    <p>{<MdStar className="text-yellow-300" size={15}/>}</p>
                    <p className="text-md text-white">{data.vote_average.toFixed(1)}</p>
                </div>
            </div>
            <p className="h-fit line-clamp-1 items-center text-gray-200 w-full font-medium text-lg">{data.title || data.name}</p>
        </div>
    )
}

export default MovieCard1;