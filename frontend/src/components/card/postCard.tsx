import "./postCard.scss";
import more from "../../assets/more.png";
import share from "../../assets/share.png";
import heart from "../../assets/heart.png";
import comment from "../../assets/comment.png";
import love from "../../assets/love.png";
import { Link } from "react-router-dom";
import Comments from "../comments/comments";
interface cardPorps{
    id:number;
    user:string;
    profilePic:string;
    time:string;
    description?:string;
    images?:string|string[];
    userId:number;
}

import { ThemeContext } from "../../contextApi/createContext";
import { useContext, useEffect, useRef, useState } from "react";

export default function PostCard({id,user,userId,profilePic,time,description,images}:cardPorps){
   const {theme}=useContext(ThemeContext);
   const [liked,setLiked]=useState(false);
   const [openComment,closeComment]=useState(false);
   const cardRef=useRef<HTMLDivElement>(null);

   useEffect(()=>{
     const observer=new IntersectionObserver(
        ([entry])=>{
             if(!entry.isIntersecting)closeComment(false)
        },
    {
        threshold:0,
    }
     );

     if(cardRef.current)observer.observe(cardRef.current);

     return ()=>{

        if(cardRef.current)
        observer.unobserve(cardRef.current)
     }
   },[])

    return <div ref={cardRef} className={`postCard${theme=="light"?"":" dark"}`}>
           
           <div className="user">

               <div className="details">

                    <Link to={`/profile/${userId}`}>
                        <img src={profilePic} alt="PP"/>
                    </Link>
                  

                   <div className="name-time">
                    <Link to={`/profile/${userId}`}>
                        <span>{user}</span>
                    </Link>
                        <span>{time}</span>
                   </div>
                  
               </div>
                <img src={more} alt="more" />
           </div>

           <div className="description">
              <p>{description}</p>
           </div>

          { images && <div className="images">
                {
                    Array.isArray(images)?
                    images.map((image,i)=>{
                        return <img src={image} alt="image" key={i} />
                        
                    }):<img src={images} alt="image"/>
                }
           </div>}

           <div className="reactions">
              <div className="likes">
                 {liked?<img src={love} alt="love" className="liked" onClick={()=>setLiked(!liked)}/>:<img src={heart} alt="heart"  onClick={()=>setLiked(!liked)}/>}
                    <span>3,026</span>
              </div>

              <div className="comment-icon" onClick={()=>closeComment(!openComment)}>
                   <img src={comment} alt="comment" />
                   <span>12</span>
              </div>
              <div className="share">
                   <img src={share} alt="share" />
                   <span>Share</span>
              </div>
           </div>
           {openComment && <Comments/>}
    </div>
}