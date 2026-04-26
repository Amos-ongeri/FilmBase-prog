import { MdHomeMax, MdFormatListBulletedAdd, MdLiveTv, MdOutlineMovieCreation, MdPlayArrow } from "react-icons/md";
import { PiFilmReel } from "react-icons/pi";
import { HiBars3 } from "react-icons/hi2";
// import { useNavigate } from "react-router-dom";
import { CiPlay1 } from "react-icons/ci";
import Navigation1 from "./sideNavigation1";

const TopBar = () => {
    // const navigator = useNavigate();
    // const navigateTo = (path)=>{
    //     navigator(path)
    // }

    return (
        <div className='flex items-center justify-between text-gray-200 font-sans font-extralight bg-black sticky top-0 z-30 min-w-full h-[6%] pl-3 pr-3'>
            {/* <div className="flex items-center space-x-3">
                <HiBars3 size={30}/>
                <div className="flex items-center justify-between w-full text-2xl h-[10%]">
                    <div  onClick={()=> navigateTo('/home')} title="Home" className="flex items-center  justify-center cursor-pointer">
                        <p className="text-white "><span>Film</span>
                            <span className="text-[#FF3C00] drop-shadow-sm">Base</span>
                        </p>
                        <p><CiPlay1 fill="#FF3C00"/></p>
                    </div>
                </div>
            </div> */}
            <div></div>
            <div className="flex items-center border border-slate-400 lg:w-[5%] w-14 h-7 rounded-2xl"><div className="rounded-full bg-white w-7 h-7"></div></div>
        </div> 
    )
}

export default TopBar;