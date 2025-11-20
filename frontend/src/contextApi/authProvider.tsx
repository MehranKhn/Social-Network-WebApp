import { useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "./createContext";
import axios from "axios";

interface props{
    children:ReactNode
}



function AuthProvider({children}:props){
    const [isAuthenticated,setIsAuthenticated]=useState(false);
    const [loading,setLoading]=useState(true);
    const [currentUserId,setCurrentUserId]=useState<number|null>(null);
     useEffect(()=>{
        console.log("auth provider")
        axios.get("http://192.168.12.31:3000/api/auth/me",{
            withCredentials:true
        })
        .then((res)=> {
            setIsAuthenticated(true);
            if(res.data.id){
                setCurrentUserId(res.data.id);
            }
        })
        .catch(()=>setIsAuthenticated(false))
        .finally(()=>setLoading(false))
     },[])

    return <AuthContext.Provider value={{isAuthenticated,setIsAuthenticated,loading,currentUserId,setCurrentUserId}}>
            {children}
    </AuthContext.Provider>
}
export default AuthProvider