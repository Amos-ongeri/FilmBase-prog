import { MdHomeMax, MdFormatListBulletedAdd, MdLiveTv, MdOutlineMovieCreation, MdPlayArrow } from "react-icons/md";
import { PiFilmReel } from "react-icons/pi";
import { HiBars3 } from "react-icons/hi2";
import { useLocation, useNavigate } from "react-router-dom";
import { CiPlay1 } from "react-icons/ci";

const TopBar = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const navItems = [
        { name: "Home", path: "/", icon: <MdHomeMax /> },
        { name: "Movies", path: "/movies", icon: <MdOutlineMovieCreation /> },
        { name: "TV Series", path: "/tv-series", icon: <MdLiveTv /> },
        { name: "Anime", path: "/anime",icon: <MdPlayArrow /> },
        { name: "short film", path: "/shorts", icon: <PiFilmReel /> },
        { name: "My List", path: "/my-list", icon: <MdFormatListBulletedAdd /> },
    ]

    const navigateTo = (path)=>{
        navigate(path)
    }

    return (
        <div className='flex items-center text-gray-200 font-sans font-extralight bg-black sticky top-0 z-20 min-w-full h-15 pl-3 pr-3 space-x-5'>
            <div className="flex items-center justify-between w-[15%] text-3xl">
                <button className="cursor-pointer hover:bg-gray-500/50 rounded-full transition-all duration-200 p-2">
                    <HiBars3 size={25}/>
                </button>
                <div  onClick={()=> navigateTo('/')} title="Home" className="flex items-center cursor-pointer">
                    <p className="text-white ">Film
                        <span className="text-yellow-500 drop-shadow-sm">Base</span>
                        {/* <sup className="text-sm">tm</sup> */}
                    </p>
                    <CiPlay1 className="text-yellow-500"/>
                </div>
            </div>
            <div className="flex-1"></div>
        </div> 
    )
}

export default TopBar;