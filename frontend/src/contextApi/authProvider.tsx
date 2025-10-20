import { useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "./createContext";
import axios from "axios";

interface props{
    children:ReactNode
}



function AuthProvider({children}:props){
    const [isAuthenticated,setIsAuthenticated]=useState(false);
    const [loading,setLoading]=useState(true);
    
     useEffect(()=>{
        axios.get("http://localhost:3000/api/auth/me")
        .then(()=> setIsAuthenticated(true))
        .catch(()=>setIsAuthenticated(false))
        .finally(()=>setLoading(false))
     },[])

    return <AuthContext.Provider value={{isAuthenticated,setIsAuthenticated,loading}}>
            {children}
    </AuthContext.Provider>
}
export default AuthProvider