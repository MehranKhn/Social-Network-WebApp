import "./stories.scss"
import umaidKhan from "../../assets/umaidKhan.jpg";
import heroFaizan from "../../assets/heroFaizan.jpg";
import { useContext, useEffect, useRef, useState } from "react";
import left from "../../assets/left.png"
import next from "../../assets/next.png"
import StoryOptions from "../StoryFunctionalities/addstory/storyOptions";
import { ThemeContext } from "../../contextApi/createContext";
import useFetchFriendsStories from "../../customHook/fetchFrndsStories";
import DisplayStory from "../StoryFunctionalities/showStory/displayStory";

interface story{
   id:number,
   storyImage:string,
   storyText:string,
   createdAt:string,
   profilePic:string,
   name:string,
   storyUserId:number
}


export default function Stories(){

   const [translate,setTranslate]=useState<number>(0);
   const containerRef=useRef<HTMLDivElement>(null);
   const [leftVisible,setLeftVisible]=useState(false);
   const [rightVisible,setRightVisible]=useState(true);
   const [storyOptions,setStoryOptions]=useState(false);
   const {theme}=useContext(ThemeContext);
   const [displayStory,setDisplayStory]=useState(false);
   const {data,isLoading,isError}=useFetchFriendsStories("/story/get-stories");
   const [userStories, setUserStories] = useState<story[]>([]);
   

   const user=localStorage.getItem('user');
   const currentUser=JSON.parse(user!);
   console.log(currentUser.username)
   useEffect(()=>{
      if(containerRef.current==null)return;
      setLeftVisible(translate>0);
      setRightVisible(translate+containerRef.current.clientWidth<containerRef.current.scrollWidth);
      
 },[translate,data?.stories])

   //translate functions

   function translateLeft(){
      setTranslate(prev=>{
        if(prev-260<0){
            return 0;
        }
        return prev-260;
      })

      
   }



   function translateRight(){
        
       setTranslate(prev=>{
        if(containerRef.current==null) return translate;
         const newTranslate=translate + 260;
         const edge=containerRef.current.scrollWidth;
         const width=containerRef.current.clientWidth;
         if(newTranslate + width >= edge){
            return edge-width;
         }
         return newTranslate;
      })
   }
  
   function filterDisplayStories(userId:number){
      const stories=data.stories.filter((s:story)=>s.storyUserId==userId);
      setUserStories(stories);
      setDisplayStory(true);
   }
   
   if(isLoading)return <div>...loading</div>
   if(isError) return <div>Failed to load stories</div>
     
     return (
        <div className="stories">

               {displayStory && <DisplayStory story={userStories} onClose={() => setDisplayStory(false)}></DisplayStory>}
       
        <div className="user-wrapper">
            <div className={`user${theme=='light'?"":" dark"}`} onClick={()=>setStoryOptions(prev=>!prev)}>
               
                {currentUser.profilePic?<img src={currentUser.profilePic} alt="user-profile" />:<span className="user-profile-text">{currentUser.username[0].toUpperCase()}</span>}
                <span>Your Story</span>
                <button>+</button>
            </div>
                {storyOptions && <StoryOptions setStoryOptions={setStoryOptions}/>}
        </div>

         <div className="stories-wrapper">
            <div className="container" ref={containerRef}  style={{transform:`translateX(-${translate}px)`}}>

                {
                    data.stories.map((story:story)=>{
                        return <div key={story.id} className="story" onClick={()=>filterDisplayStories(story.storyUserId)}>
                            {story.profilePic?<img src={story?.profilePic} alt="story" />:<span className="story-profile-text">{story.name[0].toUpperCase()}</span>}
                            <span >{story.name}</span>
                        </div>
                    })
                }
            </div>
           {leftVisible && <button className="left" onClick={translateLeft}>
                <img src={left} alt="left" />
            </button>}

            {rightVisible && <button className="right" onClick={translateRight} >
                <img src={next} alt="right" />
            </button>}
         </div>

            
      </div>
     )
}
