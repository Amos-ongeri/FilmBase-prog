import { MdPlayArrow, MdStar } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const MovieCard2 = ({data})=>{
    const navigate = useNavigate()

    const navigateTo = ()=>{
        navigate(`/details/${data?.id}/${data?.media_type}`)
    }
    return (
        <div className="flex space-x-2 w-80 h-60">
            <img src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} alt="" className="flex-1 h-60 rounded-2xl"/>
            <div className="text-white flex-2">
                <p className="text-2xl line-clamp-2">{data?.title || data?.name}</p>
                <br />
                <p className="">{data?.release_date}</p>
                <div className="flex space-x-3 items-center">
                    <p>{`${data?.media_type} | ${data?.original_language}`}</p>
                    <div className="flex items-center spaxe-x-1">
                        <MdStar className="" fill="yellow" size={25}/>
                        <p className="text-xl">{data?.vote_average?.toFixed(1)}</p>
                    </div>
                </div>
                <br />
                <button onClick={navigateTo} className="bg-blue-500 hover:bg-blue-600 p-2 rounded-2xl cursor-pointer transition-all duration-75 flex items-center space-x-1 text-white">
                    <p>{<MdPlayArrow/>}</p>
                    <p>watch trailer</p>
                </button>
            </div>
        </div>
    )
}

export default MovieCard2;