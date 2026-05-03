import { MdHomeMax, MdFormatListBulletedAdd, MdLiveTv, MdOutlineMovieCreation, MdPlayArrow } from "react-icons/md";
import { PiFilmReel } from "react-icons/pi";
import { HiBars3 } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { CiPlay1 } from "react-icons/ci";
import Navigation1 from "./sideNavigation1";
import { useState } from "react";
import { MoonIcon, SunIcon } from "lucide-react";
import { useScrollDirection } from "@/hooks/scrollevent";

const TopBar = ({toggleSidebar}) => {
    const [theme, setTheme] = useState("dark");
    const show = useScrollDirection();

    const navigator = useNavigate();
    const navigateTo = (path)=>{
        navigator(path)
    }

    console.log(show);
    

    return (
        <div className={`fixed top-0 flex items-center justify-between text-gray-200 font-sans font-extralight z-30 min-w-full h-15 px-3 ${show ? "translate-y-0" : "-translate-y-full"} transform transition-transform duration-300`}>
            <div className="flex items-center space-x-3">
                <HiBars3 onClick={toggleSidebar} size={30}/>
                <div className="flex items-center justify-center rounded-md p-1 w-full text-2xl h-[10%] glass">
                    <div  onClick={()=> navigateTo('/home')} title="Home" className="flex items-center  justify-center cursor-pointer">
                        <p className="text-white "><span>Film</span>
                            <span className="text-[#FF3C00] drop-shadow-sm">Base</span>
                        </p>
                        <p><CiPlay1 fill="#FF3C00"/></p>
                    </div>
                </div>
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