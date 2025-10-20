import "../../darkThemeStyles/navBarStyles.scss"
import "./navBar.scss";

import home from '../../assets/home.svg'
import moon from '../../assets/moon.svg'
import sun from "../../assets/sun.png"
import tools from '../../assets/tools.svg'
import search from '../../assets/search.svg'
import menu from "../../assets/menu.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useRef, useState } from "react";
import close from "../../assets/close.png";

import { useContext } from "react";
import { AuthContext, SidebarContext } from "../../contextApi/createContext";
import { ThemeContext } from "../../contextApi/createContext";
import axios from "axios";

import Stories from "../stories/stories";

function NavBar(){

  const inputRef=useRef<HTMLInputElement>(null);
  const [notifications,setNotifications]=useState(11);
  const location=useLocation();
  const hideStories=location.pathname.startsWith("/profile");

  const {sidebar,toggleSideBar}=useContext(SidebarContext);
  const {theme,toggleTheme}=useContext(ThemeContext);
  const {setIsAuthenticated}=useContext(AuthContext);
  const navigate=useNavigate();
  function focusInput(){
    if(inputRef.current){
        inputRef.current.focus();
    }
  }

  async function handleLogout(){

    try{

      const res=await axios.post("http://localhost:3000/api/auth/logout",{
        withCredentials:true
      });
      setIsAuthenticated(false);
      navigate("/login")

    }catch(e){
      console.log(e);
    }

  }
    return <div className={`navBar${theme=="light"?"":" dark"}`}>
          
        <div className="left">
             <Link to="/" style={{textDecoration:"none"}}>
               <span>Zwitter</span>
             </Link>
             

             <div className="icons">
                <img src={home} alt="home"/>
                {theme=="light"?<img src={moon} alt="moon" onClick={toggleTheme}/>:<img src={sun} alt="moon" onClick={toggleTheme}/>}
                <img src={tools} alt="tools"/>
                {sidebar?<img src={close} alt="menu"  onClick={toggleSideBar}/>:<img src={menu} alt="menu"  onClick={toggleSideBar}/>}
             </div>
            
            <div className="search" onClick={focusInput}> 
               <img src={search} alt="search" />
               <input ref={inputRef} type="text" placeholder="Search..." />
            </div>

        </div>

        <div className="right">
             {/* profile */}
             <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="#000000"><g fill="none" stroke="#000000" strokeWidth="1.5"><path strokeLinejoin="round" d="M4 18a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"/><circle cx="12" cy="7" r="3"/></g></svg>
              
              {/* Message */}
             <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="#000000"><g fill="none" stroke="#000000" strokeWidth="1.5"><rect width="16" height="12" x="4" y="6" rx="2"/><path d="m4 9l7.106 3.553a2 2 0 0 0 1.788 0L20 9"/></g></svg>
              
              <div className="searchIcon">
                <img src={search} alt="search" />
              </div>
                    

              {/* Notification */}


              <div className="notify" style={{display:"flex",alignItems:"center", position:"relative"}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 24 24" ><path fill="#000000" d="M4 8a8 8 0 1 1 16 0v4.697l2 3V20h-5.611a4.502 4.502 0 0 1-8.777 0H2v-4.303l2-3V8Zm5.708 12a2.5 2.5 0 0 0 4.584 0H9.708ZM12 2a6 6 0 0 0-6 6v5.303l-2 3V18h16v-1.697l-2-3V8a6 6 0 0 0-6-6Z"/ ></svg>

                <span style={{position:"absolute",top:-5,right:-12, backgroundColor:"#FF0000",width:"24px",height:"15px",color:"white",borderRadius:"25px",textAlign:"center",fontSize:"small"}}>{notifications}</span>
              </div>

             {/* <div className=""> */}
               {/* <img src={heroFaizan} alt="Faizan" className={isImageBig?"enlarged":"img"} onClick={toggleImage}/>
               <span>Mehran khan</span>     */}
               <button className="logout" onClick={handleLogout}>Logout</button>
             {/* </div> */}
        </div>

       { !hideStories && <div className="stories">
           <Stories></Stories>
        </div>}

    </div>
}

export default NavBar;