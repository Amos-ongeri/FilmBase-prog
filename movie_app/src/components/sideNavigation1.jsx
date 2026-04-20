import { GoHome } from "react-icons/go";
import { CiCompass1 } from "react-icons/ci";
import { useLocation, useNavigate } from "react-router-dom";
import { PiFilmSlateLight } from "react-icons/pi";
import { MdLiveTv } from "react-icons/md";
import { CiPlay1 } from "react-icons/ci";
import { BiDetail } from "react-icons/bi";

const Navigation1 = ()=>{
    const navigationData = [
        {path: '/home', name: 'home', icon: <GoHome className="text-white" size={20}/>},
        {path: '/discover',name:'discover',icon: <CiCompass1 className="text-white" size={20}/>},
        {path: '/movies', name: 'movies', icon: <PiFilmSlateLight className="text-white" size={20}/>},
        {path: '/tv', name: 'Tv-series', icon: <MdLiveTv className="text-white" size={20}/>}
    ]

    const location = useLocation();
    const navigator = useNavigate();
    const navigateTo = (path)=>{
        navigator(path)
    }
    return (
        <div className="sticky top-0 w-[10%] flex flex-col  space-x-10 h-full z-50 bg-black">
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
                {navigationData.map((l,i)=>(
                <div key={i} onClick={()=> navigateTo(l.path)} className={`flex items-center w-[95%] h-10 cursor-pointer group ${location.pathname === l.path ? "border border-slate-800 rounded-tr-sm rounded-br-sm" : ""}`}>
                    {location.pathname === l.path && (
                        <div className="bg-[#FF3C00] w-1 h-[70%] rounded-tr-lg rounded-br-lg"></div>
                    )}
                    <div className="flex items-center pl-1">
                        <p>{l.icon}</p>
                        <p className="text-sm text-white group-hover:underline ml-2">{l.name}</p>
                    </div>
                </div>
                ))}
            </div>
            <div className="h-[2%] flex items-center justify-center w-full"><hr className="border w-[90%] border-slate-800"/></div>
            {location.pathname.match("/details") && (
                <div className="flex items-center w-[95%] h-10 cursor-pointer group border border-slate-800 rounded-tr-sm rounded-br-sm">
                    <div className="bg-[#FF3C00] w-1 h-[70%] rounded-tr-lg rounded-br-lg"></div>
                    <div className="flex items-center pl-1">
                        <BiDetail fill="white"size={20}/>
                        <p className="text-sm text-white group-hover:underline ml-2">details</p>
                    </div>
                </div>
            )}
        </div>
    )
}
export default Navigation1