import "./stories.scss"
import umaidKhan from "../../assets/umaidKhan.jpg";
import heroFaizan from "../../assets/heroFaizan.jpg";
import { useContext, useEffect, useRef, useState } from "react";
import left from "../../assets/left.png"
import next from "../../assets/next.png"

import { ThemeContext } from "../../contextApi/createContext";

export default function Stories(){

   const [translate,setTranslate]=useState<number>(0);
   const containerRef=useRef<HTMLDivElement>(null);
   const [leftVisible,setLeftVisible]=useState(false);
   const [rightVisible,setRightVisible]=useState(true);
    
   const {theme}=useContext(ThemeContext);
 useEffect(()=>{
   if(containerRef.current==null)return;
     setLeftVisible(translate>0);
     setRightVisible(translate+containerRef.current.clientWidth<containerRef.current.scrollWidth);
 },[translate])

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
  
   const stories=[
      {
         id:1,
         image:umaidKhan,
         name:"Umaid"
      },{
         id:2,
         image:heroFaizan,
         name:"Faizan"
      },{
         id:3,
         image:umaidKhan,
         name:"Faisal"
      },{
         id:4,
         image:heroFaizan,
         name:"Asif"
      },
      {
         id:5,
         image:heroFaizan,
         name:"Furqan"
      },{
         id:6,
         image:umaidKhan,
         name:"Fayaz"
      },{
         id:7,
         image:umaidKhan,
         name:"Adil"
      },
      {
        id:8,
         image:umaidKhan,
         name:"Adil"
      },
      {
         id:9,
         image:umaidKhan,
         name:"Adil"
      },
      {
         id:10,
         image:umaidKhan,
         name:"Adil"
      },
      {
         id:11,
         image:umaidKhan,
         name:"Adil"
      },
      {
         id:12,
         image:umaidKhan,
         name:"Adil"
      },
      {
         id:13,
         image:umaidKhan,
         name:"Adil"
      },
      {
         id:14,
         image:umaidKhan,
         name:"Adil"
      }
   ]
     return (
        <div className="stories">

            <div className={`user${theme=='light'?"":" dark"}`}>
                <img src={heroFaizan} alt="faizan" />
                <span>Your Story</span>
                <button>+</button>
            </div>


         <div className="stories-wrapper">
            <div className="container" ref={containerRef}  style={{transform:`translateX(-${translate}px)`}}>

                {
                    stories.map((story)=>{
                        return <div key={story.id} className="story">
                            <img src={story?.image} alt="story" />
                            <span>{story.name}</span>
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
