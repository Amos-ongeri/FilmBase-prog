import { MdHomeMax, MdFormatListBulletedAdd, MdLiveTv, MdOutlineMovieCreation, MdPlayArrow } from "react-icons/md";
import { PiFilmReel } from "react-icons/pi";
import { HiBars3 } from "react-icons/hi2";
import Navigation1 from "./sideNavigation1";

const TopBar = () => {
    return (
        <div className='flex items-center justify-between text-gray-200 font-sans font-extralight bg-black sticky top-0 z-20 min-w-full h-[11%] pl-3 pr-3 border-b border-b-slate-800'>
            <div></div>
            <div className="border border-amber-500 w-[5%] h-7 rounded-2xl"><span className="rounded-lg bg-amber-200 w-[50%] h-7 z-30"></span></div>
        </div> 
    )
}

export default TopBar;