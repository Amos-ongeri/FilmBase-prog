import { GoHome } from "react-icons/go";
import { CiCompass1 } from "react-icons/ci";
import { useLocation, useNavigate } from "react-router-dom";
import { PiFilmSlateLight } from "react-icons/pi";
import { MdLiveTv } from "react-icons/md";

const Navigation1 = ()=>{
    const navigationData = [
        {path: '/', name: 'home', icon: <GoHome className="text-white" size={25}/>},
        {path: '/discover',name:'discover',icon: <CiCompass1 className="text-white" size={25}/>},
        {path: '/movies', name: 'movies', icon: <PiFilmSlateLight className="text-white" size={25}/>},
        {path: '/tv', name: 'Tv', icon: <MdLiveTv className="text-white" size={25}/>}
    ]

    const location = useLocation();
    const navigator = useNavigate();
    const navigateTo = (path)=>{
        navigator(path)
    }
    return (
        <div className="sticky top-15 w-[5%] flex flex-col items-center space-y-9 h-full z-50 bg-black">
            {navigationData.map((l,i)=>(
                <div key={i} onClick={()=> navigateTo(l.path)} className="flex flex-col items-center cursor-pointer">
                    <p>{l.icon}</p>
                    <p className="text-sm text-white">{l.name}</p>
                </div>
            ))}
        </div>
    )
}
export default Navigation1