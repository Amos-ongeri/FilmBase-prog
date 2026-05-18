import { MdLiveTv, MdOutlineWatchLater } from "react-icons/md";
import { PiFilmSlateLight } from "react-icons/pi";
import { HiBars3 } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { CiCompass1, CiPlay1 } from "react-icons/ci";
import { MoonIcon, SunIcon } from "lucide-react";
import { useScrollDirection } from "@/hooks/scrollAwareness";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { GoHome } from "react-icons/go";
import { BiDetail } from "react-icons/bi";
import { useTheme } from "@/contexts/Theme";
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "./ui/avatar";

const TopBar = ({toggleSidebar}) => {
    const {theme, toggleTheme} = useTheme()
    const show = useScrollDirection();

    const navigator = useNavigate();
    const navigateTo = (path)=>{
        navigator(path)
    }

    const mainNavigationData = [
            {path: '/', name: 'Home', icon: <GoHome className="text-background dark:text-white" size={25}/>},
            {path: '/movies', name: 'Movies', icon: <PiFilmSlateLight className="text-background dark:text-white" size={25}/>},
            {path: '/tv', name: 'Tv-Series', icon: <MdLiveTv className="text-background dark:text-white" size={25}/>},
        ]
        const otherNavigationData = [
            {path: '/discover',name:'Discover',icon: <CiCompass1 className="text-background dark:text-white" size={25}/>},
            {path: '/watch-list', name: 'Watch List', icon: <MdOutlineWatchLater className="text-background dark:text-white" size={25}/>}
        ]

    return (
        <div className={`fixed top-0 flex items-center justify-between text-gray-200 font-sans font-extralight z-30 min-w-full h-15 px-3 ${show ? "translate-y-0" : "-translate-y-full"} transform transition-transform duration-300`}>
            <div className="flex items-center space-x-3">
                <div className="md:hidden rounded-md glass text-background dark:text-foreground p-1 h-[10%]"><HiBars3 onClick={toggleSidebar} size={30}/></div>
                <div  onClick={()=> navigateTo('/')} title="HomePage" className="flex items-center justify-center rounded-md p-1 w-full text-2xl h-[10%] glass transition duration-150">
                    <p className="dark:text-white text-background "><span>Film</span>
                        <span className="text-primary drop-shadow-sm font-extrabold">Base</span>
                    </p>
                    <p><CiPlay1 className="text-primary" /></p>
                </div>
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                        <NavigationMenuTrigger><p>more content</p></NavigationMenuTrigger>
                        <NavigationMenuContent>
                            {mainNavigationData.map((l,i)=>(
                                <NavigationMenuLink onClick={()=> navigateTo(l.path)}>
                                    <div key={i}  className="flex items-center w-full h-10 cursor-pointer group">
                                        {location.pathname === l.path && (
                                            <div className="bg-[#FF3C00] w-1 h-[70%] rounded-tr-lg rounded-br-lg"></div>
                                        )}
                                        <div className="flex items-center w-fit pl-1">
                                            <p className="group-hover:-translate-x-1 ml-2 transform transition-transform duration-300">{l.icon}</p>
                                            <p className="text-sm text-background dark:text-white ml-2 ">{l.name}</p>
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
                                            <p className="text-sm text-background dark:text-white ml-2">{l.name}</p>
                                        </div>
                                    </div>
                                </NavigationMenuLink>
                            ))}
                            {location.pathname.match("/details") && (
                                <NavigationMenuLink>
                                    <div className="flex items-center w-full h-10 cursor-pointer group ">
                                        <div className="bg-[#FF3C00] w-1 h-[70%] rounded-tr-lg rounded-br-lg"></div>
                                        <div className="flex items-center pl-1">
                                            <BiDetail className="group-hover:-translate-x-1 ml-2 transform transition-transform duration-300 text-background dark:text-white" size={25}/>
                                            <p className="text-sm text-background dark:text-white ml-2">Details</p>
                                        </div>
                                    </div>
                                </NavigationMenuLink>
                            )}
                        </NavigationMenuContent>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
            <div className="flex items-center space-x-3">
                <Avatar>
                    <AvatarImage
                    src="/inception/cast/EP.webp"
                    alt="amos"
                    />
                    <AvatarFallback>AM</AvatarFallback>
                    <AvatarBadge className="bg-green-600 dark:bg-green-800" />
                </Avatar>
                <div onClick={toggleTheme} className="glass rounded-full p-1 flex items-center">
                    <button className={`h-9 w-9 rounded-full flex items-center justify-center transition ${theme === "dark" ? "bg-primary text-primary-foreground shadow-glow transition-colors duration-300" : "text-muted/50 hover:text-background"}`}
                    >
                        <MoonIcon className="w-4 h-4" />
                    </button>
                    <button className={`h-9 w-9 rounded-full flex items-center justify-center transition ${theme === "light" ? "bg-primary text-primary-foreground shadow-glow transition-colors duration-300" : "text-muted-foreground hover:text-foreground"}`}
                    >
                        <SunIcon className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TopBar;