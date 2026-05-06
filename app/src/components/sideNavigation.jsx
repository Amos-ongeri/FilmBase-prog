import { GoHome } from "react-icons/go";
import { CiCompass1 } from "react-icons/ci";
import { useLocation, useNavigate } from "react-router-dom";
import { PiFilmSlateLight } from "react-icons/pi";
import { MdLiveTv, MdOutlineWatchLater } from "react-icons/md";
import { CiPlay1 } from "react-icons/ci";
import { BiDetail } from "react-icons/bi";
import { MoonIcon, SunIcon, X } from "lucide-react";
import { useRef } from "react";

const Navigation = ({isOpenSidebar, toggle})=>{

    const mainNavigationData = [
        {path: '/', name: 'Home', icon: <GoHome className="text-background/50 dark:text-foreground/50 " size={25}/>},
        {path: '/movies', name: 'Movies', icon: <PiFilmSlateLight className="text-background/50 dark:text-foreground/50 " size={25}/>},
        {path: '/tv', name: 'Tv-Series', icon: <MdLiveTv className="text-background/50 dark:text-foreground/50 " size={25}/>},
    ]
    const otherNavigationData = [
        {path: '/discover',name:'Discover',icon: <CiCompass1 className="text-background/50 dark:text-foreground/50 " size={25}/>},
        {path: '/watch-list', name: 'Watch List', icon: <MdOutlineWatchLater className="text-background/50 dark:text-foreground/50 " size={25}/>}
    ]

    const location = useLocation();
    const navigator = useNavigate();
    const navigateTo = (path)=>{
        navigator(path)
    }
    const navRef = useRef()

    const closeNav = () => {
        if(isOpenSidebar){
            toggle();
        }
    }

    return (
        <>
        <aside ref={navRef} className={`flex flex-col z-50 fixed top-0 transform transition-transform duration-300 ${isOpenSidebar ? "translate-x-0" : "-translate-x-full"} w-[60%] md:hidden space-x-10 h-screen md:h-full dark:bg-muted bg-foreground`}>
            <div className="flex items-center justify-between px-4 rounded-md p-1 w-full text-2xl h-[10%]">
                <div  onClick={()=> navigateTo('/')} title="Home Page" className="flex items-center  justify-center cursor-pointer">
                    <p className="text-background dark:text-foreground"><span>Film</span>
                        <span className="text-primary drop-shadow-sm font-extrabold">Base</span>
                    </p>
                    <p><CiPlay1 className="text-primary" /></p>
                </div>
                <div onClick={closeNav} className="glass text-background/70 dark:text-foreground/50  rounded-md p-1"><X /></div>
            </div>
            <div className="pt-3 space-y-3 pb-3 w-full">
                {mainNavigationData.map((l,i)=>(
                <div key={i} onClick={()=> {
                    navigateTo(l.path);
                    closeNav();
                    }} className="flex items-center w-[95%] h-10 cursor-pointer group">
                    {location.pathname === l.path && (
                        <div className="bg-[#FF3C00] w-1 h-[70%] rounded-tr-lg rounded-br-lg"></div>
                    )}
                    <div className="flex items-center pl-1">
                        <p>{l.icon}</p>
                        <p className="text-sm text-background dark:text-foreground/50 group-hover:underline ml-4">{l.name}</p>
                    </div>
                </div>
                ))}
            </div>
            <div className="h-[2%] flex items-center justify-center w-full"><hr className="border w-[90%] border-slate-400"/></div>
            <div className="pt-3 space-y-3 pb-3 w-full">
                {otherNavigationData.map((l,i)=>(
                <div key={i} onClick={()=> {
                    navigateTo(l.path);
                    closeNav();
                    }} className="flex items-center w-[95%] h-10 cursor-pointer group">
                    {location.pathname === l.path && (
                        <div className="bg-[#FF3C00] w-1 h-[70%] rounded-tr-lg rounded-br-lg"></div>
                    )}
                    <div className="flex items-center pl-1">
                        <p>{l.icon}</p>
                        <p className="text-sm text-background dark:text-foreground/50  group-hover:underline ml-4">{l.name}</p>
                    </div>
                </div>
                ))}
            </div>
            {location.pathname.match("/details") && (
                <div className="flex items-center w-[95%] h-10 cursor-pointer">
                    <div className="bg-[#FF3C00] w-1 h-[70%] rounded-tr-lg rounded-br-lg"></div>
                    <div className="flex items-center pl-1">
                        <BiDetail className="text-background/50 dark:text-foreground/50" size={25}/>
                        <p className="text-sm text-background dark:text-foreground/50 group-hover:underline ml-4">Details</p>
                    </div>
                </div>
            )}
            <br />
        </aside>
        {isOpenSidebar && (
                <div
                    className="fixed inset-0 z-40 bg-muted/50 transition-colors duration-300"
                    onClick={toggle}
                />
        )}
        </>
    )
}
export default Navigation;