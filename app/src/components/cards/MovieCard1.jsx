import { CiBookmark } from "react-icons/ci";
// import {  MdStar } from "react-icons/md";
import { Link } from "react-router-dom";
import Rating from '../../../node_modules/@mui/material/Rating';
import { getPosterSize } from "@/utils/imageSizes";

const MovieCard1 = ({data,Key}) => {
    
    const rating = ((data?.vote_average/10)*5).toFixed(1);
    return(
        <div key={Key}  className="lg:w-50 lg:h-80 w-40 h-fit lg:mb-15 rounded-lg transition-shadow duration-200 space-y-2">
            <Link to={`/details/${data?.id}/${data?.media_type}`}>
            <div className="h-fit w-full relative group perspective-near overflow-hidden rounded-lg">
                <img loading="lazy" className="rounded-lg w-full h-70 object-cover object-center group-hover:translate-z-3 hover:opacity-70 transition-all duration-200 cursor-pointer" src={data?.poster_path ? `https://image.tmdb.org/t/p/${getPosterSize()}${data?.poster_path}` : ''} />
                <div className="flex items-center justify-center space-x-1 min-w-12 rounded-lg px-1 absolute bottom-1 left-1 text-gray-300 bg-slate-700">
                    <Rating sx={{
                        '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
                        color: '#b1bccd', // empty star outline color
                        },
                    }} name="half-rating-read" size="small" defaultValue={Number(rating)} precision={0.5} readOnly />
                    <p>{rating}</p>
                </div>
            </div>
            </Link>
            <div className="h-fit">
                <div className="flex justify-between space-x-2 w-full">
                    <p title={data?.title || data?.name} className="line-clamp-1 items-center text-gray-200 w-[80%] font-medium text-lg divide divide-slate-800">{data.title || data?.name}</p>
                    <CiBookmark className="cursor-pointer w-[10%]" fill="white" size={25}/>
                </div>
                <div className="divide-x divide-slate-800 flex items-center"><p className="pr-2">{data?.media_type}</p><p className="pl-2">{data?.release_date?.split("-")[0] || data?.first_air_date?.split("-")[0]}</p></div>
            </div>
        </div>
    )
}

export default MovieCard1;