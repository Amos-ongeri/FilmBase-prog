import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState("dark");

    useEffect(() => {
        const initTheme = () => {
            const savedTheme = localStorage.getItem("theme");

            if(savedTheme){
                setTheme(savedTheme)
            } else {
                const preferDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

                setTheme(preferDark ? "dark" : "light");
            }
        }
        initTheme();
    },[])

    useEffect(() => {
        if(theme === "dark"){
            document.documentElement.classList.add("dark");
            document.documentElement.classList.remove("light");
        } else {
            document.documentElement.classList.add("light");
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    },[theme])

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === "dark" ? "light" : "dark");
    }

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    const theme = useContext(ThemeContext);

    if(!theme){
        throw new Error("theme must be used with provider");
    }

    return theme;
}