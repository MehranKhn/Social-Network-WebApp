import { createContext,type SetStateAction} from "react";

interface authContextType{
    isAuthenticated:boolean,
    setIsAuthenticated:React.Dispatch<SetStateAction<boolean>>,
    loading:boolean
}


export const SidebarContext=createContext({
    sidebar:false,
    toggleSideBar:()=>{}
});

export const ThemeContext=createContext({
    theme:'light',
    toggleTheme:()=>{}
});

export const AuthContext=createContext<authContextType>({
    isAuthenticated:false,
    setIsAuthenticated:()=>{},
    loading:true
})