import "./profile.scss"
import noCoverPic from "../../assets/noCoverPic.jpeg";
import noProfile from "../../assets/noProfile.png";
import facebook from "../../assets/facebook.png"
import social from "../../assets/social.png"
import instagram from "../../assets/instagram.png"
import linkedIn from "../../assets/linkedin.png"
import twitter from "../../assets/twitter.png"
import map from "../../assets/map.png";
import web from "../../assets/world-wide-web.png"
import hand from "../../assets/hand.png"
import more from "../../assets/more.png";

import { ThemeContext } from "../../contextApi/createContext";
import { useContext } from "react";
import PostCard from "../../components/card/postCard";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext  } from "../../contextApi/createContext";
import useGetUserLikes from "../../customHook/likesOfUser";
interface post{
    id:number,
    description?:string,
    image?:string,
    userId:number,
    profilePic?:string,
    name:string
}

interface postLikedByUser{
    id:number,
    likePostId:number,
    likeUserId:number
}
function Profile(){
  
  const {theme}=useContext(ThemeContext);
  const {currentUserId}=useContext(AuthContext);
  const {id:userId}=useParams()
  const navigate=useNavigate();

  if(!currentUserId)return
  
      //stores the posts liked by the user so that they will display red heart
      const {data:likedPosts,isLoading:likesLoading}=useGetUserLikes(currentUserId)
  

  const {isLoading,isError,data:posts,error}=useQuery({
    queryKey:[`posts_${userId}`],
    queryFn:async()=>{

        const res=await axios.get(`http://192.168.12.31:3000/api/post/getProfilePosts/${userId}`,{
         withCredentials:true
        });
        return res.data;
    },
    staleTime:5000,
  })
   if(isLoading){
        return <div  style={{height:"100vh",display:"flex",justifyContent:"center",alignItems:"center"}}>
            <div className="spinner"></div>
        </div>
    }
    if(isError){
        
      console.log(error)
        return <div style={{height:"100vh",display:"flex",justifyContent:"center",alignItems:"center"}}>

          <span>Oops! Something went Wrong. Navigating Back to Home page</span>
        </div>
    }
    if(likesLoading){
      console.log("likes are getting loaded");
      return
    }
    return(
        <div className={`profile${theme=="light"?"":" dark"}`}>
            <div className="images">
                {posts[0]?.coverPic?<img src={posts[0]?.coverPic} alt="faizan" className="cover"/>:<img src={noCoverPic} alt="faizan" className="cover"/>}

                 {posts[0].profilePic ? <img src={posts[0].profilePic} alt="umaid" className="profilePic" />:<img src={noProfile} alt="umaid" className="profilePic" />}

            </div>
            <div className="profileContainer">
               <div className="userInfo">
                   <div className="left">
                      <a href="https://github.com/MehranKhn">
                        <img src={facebook} alt="facebook" />
                      </a>
                      <a href="https://github.com/MehranKhn">
                        <img src={instagram} alt="instagram" />
                      </a>
                      <a href="https://github.com/MehranKhn">
                        <img src={twitter} alt="twitter" />
                      </a>
                      <a href="https://github.com/MehranKhn">
                         <img src={linkedIn} alt="linkedIn" />
                      </a>
                      <a href="https://github.com/MehranKhn">
                         <img src={social} alt="pintrest" />
                      </a>
                   </div>
                   <div className="center">
                       <span>{posts[0].name}</span>
                        <div className="info">
                            <div className="item">
                              <img src={map} alt="map" />
                              <span>{posts[0].city?posts[0].city:"_"}</span>
                            </div>
                            <div className="item">
                              <img src={web} alt="website" />
                              <span>{posts[0].website?posts[0].website:"_"}</span>
                            </div>
                        </div>
                             <button>Follow</button>
                   </div>
                   <div className="right">
                      <img src={hand} alt="hand" />
                      <img src={more} alt="more" />
                   </div>
               </div>

                {

               posts.length>0 && posts.map((post: post, index: number) => {
                const isLast = index === posts.length - 1;
                return (
                  <div key={post.id} style={{display:"flex",justifyContent:"center",width:"90%",marginBottom: isLast ? "50px" : "0" }}>
                    <PostCard
                      id={post.id}
                      user={post.name}
                      userId={post.userId}
                      profilePic={post.profilePic}
                      description={post.description}
                      images={post.image}
                      likedByUser={likedPosts.length>0?likedPosts.some((l:postLikedByUser)=>l.likePostId==post.id):false}
                      />
                      
                  </div>
                );
                })
              }

            </div>

        </div>
    )
}
export default Profile;