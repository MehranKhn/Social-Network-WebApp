import { useState, type ReactNode } from "react";
import { SidebarContext } from "./createContext";

interface Props{
    children:ReactNode;
}

export function SideBarProvider({children}:Props){
     const [sidebar,setSideBar]=useState(false);

     function toggleSideBar(){
         setSideBar(prev=>!prev);
     }
     return(
        <SidebarContext.Provider value={{sidebar,toggleSideBar}}>
              {children}
        </SidebarContext.Provider>
     )
}