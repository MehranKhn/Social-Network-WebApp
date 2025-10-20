import "./leftBar.scss";
import "../../darkThemeStyles/leftBarStyles.scss";

import frnds from "../../assets/frnds.png";
import group from "../../assets/group.png";
import market from "../../assets/market.png";
import cinema from "../../assets/cinema.png";
import clock from "../../assets/clock.png";
import event from "../../assets/event.png";
import gaming from "../../assets/gaming.png";
import picture from "../../assets/picture.png";
import video from "../../assets/video.png";
import comments from "../../assets/comments.png";
import  donation from "../../assets/donation.png";
import tutorials from "../../assets/tutorials.png";
import courses from "../../assets/courses.png";

import { useState } from "react";
import { useContext } from "react";
import { SidebarContext, ThemeContext } from "../../contextApi/createContext";
import { Link } from "react-router-dom";

function LeftBar(){
    const [isImageBig,setIsImageBig]=useState(false);
    const {sidebar}=useContext(SidebarContext);
    const [userData,setUserData]=useState<{name:string,profilePic:string}>(()=>{
        return JSON.parse(localStorage.getItem("user")!)
    })
    const {theme}=useContext(ThemeContext);
    function toggleImage(){
    setIsImageBig(prev=>!prev);
  }
  console.log(userData);
    return <div className={`leftBar${sidebar?' open':''} ${theme=="light"?"":"dark"}`}>
         <div className="container">
             <div className="menu">
                <div className="items">
                    {userData.profilePic?

                    <img src={userData.profilePic} className={isImageBig?"enlarged":"img"}  onClick={toggleImage}/>:

                     <div style={{width:"35px",height:"35px",borderRadius:"50%", backgroundColor:"Lightgreen",display:"flex",justifyContent:"center",alignItems:"center",color:"white",fontWeight:"bold",fontSize:"16px"}}>{userData.name[0].toUpperCase()}</div>}
                    
                    <Link to={`/profile/1`}>
                    <span style={{fontSize:"16px"}}>{userData.name.toUpperCase()}</span> 
                    </Link>
                </div>
                <div className="items">
                    <img src={frnds} alt="frnds"/>
                    <span>Friends</span> 
                </div>
                <div className="items">
                    <img src={group} alt="frnds"/>
                    <span>Group</span> 
                </div>
                <div className="items">
                    <img src={market} alt="frnds"/>
                    <span>MarketPlace</span> 
                </div>
                <div className="items">
                    <img src={cinema} alt="frnds"/>
                    <span>Watch</span> 
                </div>
                <div className="items">
                    <img src={clock} alt="frnds"/>
                    <span>Watch</span> 
                </div>
                 <hr />
            </div>
            
                 <div className="menu">
                    <span>Your shortcuts</span>
                    
                    <div className="items">
                        <img src={event} alt="Event" />
                        <span>Events</span>
                    </div>
                    <div className="items">
                        <img src={gaming} alt="Gaming" />
                        <span>Gaming</span>
                    </div>
                    <div className="items">
                        <img src={picture} alt="Picture" />
                        <span>Gallery</span>
                    </div>
                    <div className="items">
                        <img src={video} alt="Video" />
                        <span>Videos</span>
                    </div>
                    <div className="items">
                        <img src={comments} alt="Messages" />
                        <span>Messages</span>
                    </div>
                </div>
                <hr />
                <div className="menu">
                    <span>Others</span>

                    <div className="items">
                        <img src={donation} alt="Donation" />
                        <span>Fundraiser</span>
                    </div>
                    <div className="items">
                        <img src={tutorials} alt="tutorials" />
                        <span>tutorials</span>
                    </div>
                    <div className="items">
                        <img src={courses} alt="courses" />
                        <span>courses</span>
                    </div>
                </div>
         </div>
    </div>
}

export default LeftBar;