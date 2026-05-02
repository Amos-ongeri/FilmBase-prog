import { GoHome } from "react-icons/go";
import { CiCompass1 } from "react-icons/ci";
import { useLocation, useNavigate } from "react-router-dom";
import { PiFilmSlateLight } from "react-icons/pi";
import { MdLiveTv, MdOutlineWatchLater } from "react-icons/md";
import { CiPlay1 } from "react-icons/ci";
import { BiDetail } from "react-icons/bi";

const Navigation1 = ()=>{
    const mainNavigationData = [
        {path: '/', name: 'Home', icon: <GoHome className="text-white" size={25}/>},
        {path: '/movies', name: 'Movies', icon: <PiFilmSlateLight className="text-white" size={25}/>},
        {path: '/tv', name: 'Tv-Series', icon: <MdLiveTv className="text-white" size={25}/>},
    ]
    const otherNavigationData = [
        {path: '/discover',name:'Discover',icon: <CiCompass1 className="text-white" size={25}/>},
        {path: '/watch-list', name: 'Watch List', icon: <MdOutlineWatchLater className="text-white" size={25}/>}
    ]

    const location = useLocation();
    const navigator = useNavigate();
    const navigateTo = (path)=>{
        navigator(path)
    }
    return (
        <div className="hidden lg:block sticky top-0 w-[15%] space-x-10 h-full bg-black">
            <div className="flex items-center justify-between w-full text-2xl pt-2 h-[10%]">
                <div  onClick={()=> navigateTo('/home')} title="Home" className="flex items-center  justify-center cursor-pointer">
                    <p className="text-white "><span>Film</span>
                        <span className="text-[#FF3C00] drop-shadow-sm">Base</span>
                    </p>
                    <p><CiPlay1 fill="#FF3C00"/></p>
                </div>
            </div>
            <div className="h-[2%] flex items-center justify-center w-full"><hr className="border w-[90%] border-slate-800"/></div>
            <div className="pt-3 space-y-3 pb-3 w-full">
                {mainNavigationData.map((l,i)=>(
                <div key={i} onClick={()=> navigateTo(l.path)} className={`flex items-center w-[95%] h-10 cursor-pointer group ${location.pathname === l.path ? "border border-slate-800 rounded-tr-sm rounded-br-sm" : ""}`}>
                    {location.pathname === l.path && (
                        <div className="bg-[#FF3C00] w-1 h-[70%] rounded-tr-lg rounded-br-lg"></div>
                    )}
                    <div className="flex items-center pl-1">
                        <p>{l.icon}</p>
                        <p className="text-sm text-white group-hover:underline ml-4">{l.name}</p>
                    </div>
                </div>
                ))}
            </div>
            <div className="h-[2%] flex items-center justify-center w-full"><hr className="border w-[90%] border-slate-800"/></div>
            <div className="pt-3 space-y-3 pb-3 w-full">
                {otherNavigationData.map((l,i)=>(
                <div key={i} onClick={()=> navigateTo(l.path)} className={`flex items-center w-[95%] h-10 cursor-pointer group ${location.pathname === l.path ? "border border-slate-800 rounded-tr-sm rounded-br-sm" : ""}`}>
                    {location.pathname === l.path && (
                        <div className="bg-[#FF3C00] w-1 h-[70%] rounded-tr-lg rounded-br-lg"></div>
                    )}
                    <div className="flex items-center pl-1">
                        <p>{l.icon}</p>
                        <p className="text-sm text-white group-hover:underline ml-4">{l.name}</p>
                    </div>
                </div>
                ))}
            </div>
            {location.pathname.match("/details") && (
                <div className="flex items-center w-[95%] h-10 cursor-pointer group border border-slate-800 rounded-tr-sm rounded-br-sm">
                    <div className="bg-[#FF3C00] w-1 h-[70%] rounded-tr-lg rounded-br-lg"></div>
                    <div className="flex items-center pl-1">
                        <BiDetail fill="white" size={25}/>
                        <p className="text-sm text-white group-hover:underline ml-4">details</p>
                    </div>
                </div>
            )}
            <br />
        </div>
    )
}
export default Navigation1