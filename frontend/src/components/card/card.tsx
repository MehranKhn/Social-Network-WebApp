import type { ReactNode } from "react";

interface props{
    children:ReactNode;
}
function Card({children}:props){
    return(
        <div className="card">
           {children}
        </div>
    )
}
export default Card;