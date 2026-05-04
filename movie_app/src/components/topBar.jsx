import { MdHomeMax, MdFormatListBulletedAdd, MdLiveTv, MdOutlineMovieCreation, MdPlayArrow, MdOutlineWatchLater } from "react-icons/md";
import { PiFilmReel, PiFilmSlateLight } from "react-icons/pi";
import { HiBars3 } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { CiCompass1, CiPlay1 } from "react-icons/ci";
import Navigation1 from "./sideNavigation1";
import { useState } from "react";
import { MoonIcon, SunIcon } from "lucide-react";
import { useScrollDirection } from "@/hooks/scrollevent";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { GoHome } from "react-icons/go";
import { BiDetail } from "react-icons/bi";

const TopBar = ({toggleSidebar}) => {
    const [theme, setTheme] = useState("dark");
    const show = useScrollDirection();

    const navigator = useNavigate();
    const navigateTo = (path)=>{
        navigator(path)
    }

    const mainNavigationData = [
            {path: '/', name: 'Home', icon: <GoHome className="text-white" size={25}/>},
            {path: '/movies', name: 'Movies', icon: <PiFilmSlateLight className="text-white" size={25}/>},
            {path: '/tv', name: 'Tv-Series', icon: <MdLiveTv className="text-white" size={25}/>},
        ]
        const otherNavigationData = [
            {path: '/discover',name:'Discover',icon: <CiCompass1 className="text-white" size={25}/>},
            {path: '/watch-list', name: 'Watch List', icon: <MdOutlineWatchLater className="text-white" size={25}/>}
        ]

    return (
        <div className={`fixed top-0 flex items-center justify-between text-gray-200 font-sans font-extralight z-30 min-w-full h-15 px-3 ${show ? "translate-y-0" : "-translate-y-full"} transform transition-transform duration-300`}>
            <div className="flex items-center space-x-3">
                <div className="md:hidden rounded-md glass p-1 h-[10%]"><HiBars3 onClick={toggleSidebar} size={30}/></div>
                <div className="flex items-center justify-center rounded-md p-1 w-full text-2xl h-[10%] glass">
                    <div  onClick={()=> navigateTo('/home')} title="Home" className="flex items-center  justify-center cursor-pointer">
                        <p className="text-white "><span>Film</span>
                            <span className="text-primary drop-shadow-sm font-extrabold">Base</span>
                        </p>
                        <p><CiPlay1 className="text-primary" /></p>
                    </div>
                </div>
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                        <NavigationMenuTrigger>more content</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            {mainNavigationData.map((l,i)=>(
                                <NavigationMenuLink onClick={()=> navigateTo(l.path)}>
                                    <div key={i}  className="flex items-center w-full h-10 cursor-pointer group">
                                        {location.pathname === l.path && (
                                            <div className="bg-[#FF3C00] w-1 h-[70%] rounded-tr-lg rounded-br-lg"></div>
                                        )}
                                        <div className="flex items-center w-fit pl-1">
                                            <p className="group-hover:-translate-x-1 ml-2 transform transition-transform duration-300">{l.icon}</p>
                                            <p className="text-sm text-white ml-2 ">{l.name}</p>
                                        </div>
                                    </div>
                                </NavigationMenuLink>
                            ))}
                            {otherNavigationData.map((l,i)=>(
                                <NavigationMenuLink onClick={()=> navigateTo(l.path)}>
                                    <div key={i}  className="flex items-center w-full h-10 cursor-pointer group">
                                        {location.pathname === l.path && (
                                            <div className="bg-[#FF3C00] w-1 h-[70%] rounded-tr-lg rounded-br-lg"></div>
                                        )}
                                        <div className="flex items-center pl-1">
                                            <p className="group-hover:-translate-x-1 ml-2 transform transition-transform duration-300">{l.icon}</p>
                                            <p className="text-sm text-white ml-2">{l.name}</p>
                                        </div>
                                    </div>
                                </NavigationMenuLink>
                            ))}
                            {location.pathname.match("/details") && (
                                <NavigationMenuLink>
                                    <div className="flex items-center w-full h-10 cursor-pointer group ">
                                        <div className="bg-[#FF3C00] w-1 h-[70%] rounded-tr-lg rounded-br-lg"></div>
                                        <div className="flex items-center pl-1">
                                            <BiDetail className="group-hover:-translate-x-1 ml-2 transform transition-transform duration-300" fill="white" size={25}/>
                                            <p className="text-sm text-white ml-2">Details</p>
                                        </div>
                                    </div>
                                </NavigationMenuLink>
                            )}
                        </NavigationMenuContent>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
            <div className=" py-3">
                <div className="glass rounded-full p-1 flex items-center">
                    <button
                        onClick={() => setTheme("dark")}
                        className={`h-9 w-9 rounded-full flex items-center justify-center transition ${theme === "dark" ? "bg-gradient-orange text-primary-foreground shadow-glow" : "text-muted-foreground hover:text-foreground"}`}
                    >
                        <MoonIcon className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setTheme("light")}
                        className={`h-9 w-9 rounded-full flex items-center justify-center transition ${theme === "light" ? "bg-gradient-orange text-primary-foreground shadow-glow" : "text-muted-foreground hover:text-foreground"}`}
                    >
                        <SunIcon className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TopBar;