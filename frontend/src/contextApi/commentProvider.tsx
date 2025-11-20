import { useState, type ReactNode } from "react";
import { CommentContext } from "./createContext";
export default function CommentProvider({children}:{children:ReactNode}){
    const [comment,setComment]=useState(false);
    
    function toggleComment(bool?:boolean){
       if(bool===false){
        setComment(false)
       }
       else if(!bool){
        setComment(prev=>!prev);
       }
    }

    return <CommentContext.Provider value={{comment,toggleComment}}>
        {children}
    </CommentContext.Provider>
}