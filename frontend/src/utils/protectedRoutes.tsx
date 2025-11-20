import type { PropsWithChildren } from "react";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contextApi/createContext";
type protectedRouteProps=PropsWithChildren;

export default function ProtectedRoutes({children}:protectedRouteProps){

    const {isAuthenticated,loading}=useContext(AuthContext);
        if(loading)return <div style={{
            height:"80px",
            width:"80px",
            border:"4px solid rgba(0, 0, 0, 0.1)",
            borderLeftColor:" #066baeff",
            animation:"spin 1s linear infinite"
        }}></div>;
        if(!isAuthenticated){
            return <Navigate to={"/login"} replace={true}/>
        }
        return children
    }