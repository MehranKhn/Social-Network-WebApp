import "./profile.scss"
import heroFaizan from "../../assets/heroFaizan.jpg";
import umaidKhan from "../../assets/umaidKhan.jpg"
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

import Posts from "../../components/posts/posts";
function Profile(){

    const {theme}=useContext(ThemeContext);

    return(
        <div className={`profile${theme=="light"?"":" dark"}`}>
            <div className="images">
                 <img src={heroFaizan} alt="faizan" className="cover"/>
                 <img src={umaidKhan} alt="umaid" className="profilePic" />
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
                       <span>Mehran Khan</span>
                        <div className="info">
                            <div className="item">
                              <img src={map} alt="map" />
                              <span>USA</span>
                            </div>
                            <div className="item">
                              <img src={web} alt="website" />
                              <span>Zwiiter.com</span>
                            </div>
                        </div>
                             <button>Follow</button>
                   </div>
                   <div className="right">
                      <img src={hand} alt="hand" />
                      <img src={more} alt="more" />
                   </div>
               </div>

                    <Posts></Posts> 
            </div>

        </div>
    )
}
export default Profile;