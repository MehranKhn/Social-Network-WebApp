import "./postCard.scss";
import more from "../../assets/more.png";
import share from "../../assets/share.png";
import heart from "../../assets/heart.png";
import commentImage from "../../assets/comment.png";
import love from "../../assets/love.png";
import { Link } from "react-router-dom";
import Menu from "../menu/menu";
import moment from "moment"
import useComments from "../../customHook/fetchComments";
import { AuthContext } from "../../contextApi/createContext";
import addLike from "../../services/addLikeService";
import removeLike from "../../services/removeLikeService";
import useGetLikes from "../../customHook/fetchLikesCount";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";

moment.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s Ago",   // change "ago" to "Ago"
    s: "Second",
    ss: "%d Seconds",
    m: "Minute",
    mm: "%d Minutes",
    h: "Hour",
    hh: "%d Hours",
    d: "Day",
    dd: "%d Days",
    M: "Month",
    MM: "%d Months",
    y: "Year",
    yy: "%d Years",
  },
});

interface cardPorps{
    id:number;
    user:string;
    profilePic?:string;
    time?:string;
    description?:string;
    images?:string|string[];
    userId:number;
    likedByUser?:boolean
}



import { ThemeContext } from "../../contextApi/createContext";
import { useContext, useEffect, useRef, useState } from "react";
import Comments from "../comments/comments";

export default function PostCard({id,user,userId,profilePic,time,description,images,likedByUser}:cardPorps){
    
    const {theme}=useContext(ThemeContext);
    const {currentUserId}=useContext(AuthContext);
    const [liked,setLiked]=useState(false);
    const [menu,setMenu]=useState<boolean>(false);
    const cardRef=useRef<HTMLDivElement>(null);
    const videoRef=useRef<HTMLVideoElement>(null);
    const [showComments, setShowComments] = useState(false);
    const likeTimeoutRef=useRef<number|null>(null);
    
    
    //custom hooks
    const {data}=useComments(id);
    const {data:count}=useGetLikes(id);

    useEffect(()=>{
        const html = document.documentElement; 
        if(showComments){
            document.body.style.overflow="hidden";
            html.style.overflow = "hidden";
        }
        else{
             document.body.style.overflow="auto";
             html.style.overflow = "auto";
            }
        },[showComments])

  
     
      useEffect(()=>{
         if(likedByUser)
         setLiked(likedByUser);
      },[likedByUser])

   
   useEffect(()=>{
     const observer=new IntersectionObserver(
        (entries)=>{
            entries.forEach((entry)=>{
                if(!entry.isIntersecting){
                    setShowComments(false);
                }
                if (videoRef.current && !entry.isIntersecting) {
                    videoRef.current.pause();
                }
                else {
          // Play video when visible (optional)
                    if (videoRef.current && videoRef.current.readyState>=3) {
                        videoRef.current.play();
                    }
                }
            })
             
        },
    {
        threshold:0.5,
    }
     );

     if(cardRef.current)observer.observe(cardRef.current);
     return ()=>{

        if(cardRef.current)
        observer.unobserve(cardRef.current)
     }
   },[])


   const queryClient=useQueryClient();

   async function handleLike(){
        
          if (!currentUserId) {
                console.warn("User not logged in");
                return;
                }
                setLiked(prev => !prev);

           if(likeTimeoutRef.current){
               clearTimeout(likeTimeoutRef.current);   
               likeTimeoutRef.current=null;
               return
           } 

          likeTimeoutRef.current=window.setTimeout(async()=>{
            try {
                if(!liked){
                    await addLike(currentUserId, id);
                    likeTimeoutRef.current=null;
                    queryClient.invalidateQueries({queryKey:[`likes_${id}`]})
                }
                else{
                    await removeLike(currentUserId, id);
                    likeTimeoutRef.current=null;
                    queryClient.invalidateQueries({queryKey:[`likes_${id}`]});
                    queryClient.invalidateQueries({queryKey:[`user_${currentUserId}`]});
                }

                } catch (err) {
                    console.error("Unexpected error in handleLike:", err);
                    setLiked(prev=>!prev);
              }
        },700)
      
   }
          
                
                    

            

    return <div ref={cardRef} className={`postCard${theme=="light"?"":" dark"}`} onClick={menu?()=>setMenu(false):undefined}>
           
           <div className="user">

               <div className="details">

                    <Link to={`/profile/${userId}`} style={{textDecoration:"none"}}>
                        {profilePic?<img src={profilePic} alt="PP"/>:
                           <div style={{width:"40px",height:"42px",backgroundColor:"#ffebe7ff",borderRadius:"50%",
                            border:"none",fontWeight:"bold",fontSize:"20px",display:"flex",
                            justifyContent:"center",alignItems:"center"
                            
                           }}>{ user[0].toUpperCase()}</div>}
                        
                    </Link>
                  

                   <div className="name-time">
                    <Link to={`/profile/${userId}`}>
                        <span>{user}</span>
                    </Link>
                        <span >{moment(time).fromNow()}</span>
                   </div>
                  
               </div>

               <div className={`more-options ${menu?"active":""}`} onClick={()=>setMenu(prev=>!prev)}>
                  <img src={more} alt="more"/>
                  {menu && <Menu id={userId} postId={id}></Menu>}
               </div>
           </div>

           <div className="description">
              <p>{description}</p>
           </div>

          { images && <div className="images">
                {
                    Array.isArray(images)?
                    images.map((image,i)=>{
                        return image.endsWith(".mp4")?<video src={`http://192.168.12.31:3000/uploads/${image}`} controls ref={videoRef} key={i+1} ></video>:
                        <img src={`http://192.168.12.31:3000/uploads/${image}`} alt="image" key={i+1} />
                        
                    }):images.endsWith(".mp4")?<video src={`http://192.168.12.31:3000/uploads/${images}`} ref={videoRef} controls style={{width:"100%"}} muted={true}></video>:<img src={`http://192.168.12.31:3000/uploads/${images}`} alt="image"/>
                }
           </div>}

           <div className="reactions">

              <div className="likes" onClick={handleLike}>
                {liked
                    ? <img src={love} alt="love" className="liked" />
                    : <img src={heart} alt="heart" />
                }
                 <span>{count?.likeCount}</span>
              </div>

              <div className="comment-icon" onClick={()=>setShowComments(prev=>!prev)}>
                   <img src={commentImage} alt="comment" />
                   <span>{data?.length}</span>
              </div>
              <div className="share">
                   <img src={share} alt="share" />
                   <span>Share</span>
              </div>
           </div>

 
               {/* --- Comments Modal --- */}
            {showComments && (
                <div className="comments-modal">
                <div className="overlay" onClick={() => setShowComments(false)}></div>
                <div className="modal-content">
                    <button className="close-btn" onClick={() => setShowComments(false)}>
                    ✖
                    </button>
                    <Comments postCardId={id} />
                    
                </div>
                </div>
            )}

      
    </div>
}