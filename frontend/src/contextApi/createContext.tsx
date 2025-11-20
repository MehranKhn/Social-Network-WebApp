import { createContext,type SetStateAction} from "react";

interface authContextType{
    isAuthenticated:boolean,
    setIsAuthenticated:React.Dispatch<SetStateAction<boolean>>,
    loading:boolean,
    currentUserId:number|null,
    setCurrentUserId:React.Dispatch<SetStateAction<number|null>>
}

interface commentProps{
    comment:boolean,
    toggleComment:(bool?:boolean)=>void
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
    loading:true,
    currentUserId:null,
    setCurrentUserId:()=>{}
})

export const CommentContext=createContext<commentProps>({
   comment:false,
   toggleComment:()=>{}
})