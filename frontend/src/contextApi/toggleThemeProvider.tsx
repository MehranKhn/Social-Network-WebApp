import { ThemeContext } from "./createContext";
import { useEffect, useState, type ReactNode } from "react";

interface Props{
    children:ReactNode;
}

export default function ToggleThemeProvider({children}:Props){
    
    const [theme,setTheme]=useState<string>(()=>{
        return localStorage.getItem("theme")||"light";
    })

    
    function toggleTheme(){
        setTheme(prev=>{
            const newTheme= prev=="light"?"dark":"light"
             localStorage.setItem("theme",newTheme);
             return newTheme;
        });
        
    }

    return(
    <ThemeContext.Provider value={{theme,toggleTheme}}>
           {children}
    </ThemeContext.Provider>
    )
}