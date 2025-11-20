import "./showOptions.scss"
import pen from "../../../assets/pen.png";
import storyImage from "../../../assets/storyImage.png";
import { useEffect, useState, type SetStateAction } from "react";
import AddStory from "./addStory";
import useGetUserStories from "../../../customHook/fetchUserStories";
import view from "../../../assets/view.png"
import DisplayStory from "../showStory/displayStory";
interface storyOptionsProps{
    setStoryOptions:React.Dispatch<SetStateAction<boolean>>
}


export default function StoryOptions({setStoryOptions}:storyOptionsProps){
      
     const [write,setWrite]=useState(false);
     const [showStory, setShowStory] = useState(false);
     const [previewFile,setPreviewFile]=useState<string[]>([]);
     const [file,setFile]=useState<File[]>([]);
     

     const {data,isLoading,isError}=useGetUserStories("/story/my-stories");

     if(previewFile.length>0){
         return <AddStory previewFiles={previewFile} setPreviewFiles={setPreviewFile} setFiles={setFile} files={file}></AddStory>
     }

    
    //  useEffect(()=>{
    //      if(previewFile.length>0){
    //         setStoryOptions(false);
    //      }
    //  },[previewFile])
    
    if(isLoading){
        return <div className="show-options loader-container">
            <div className="loader"></div>
        </div>
    }
    
    if (isError) {
    return (
      <div className="show-options">
        <span className="error-text">Failed to load stories</span>
      </div>
    );
  }

   
     if (showStory) {
    return <DisplayStory story={data.story} onClose={() => setShowStory(false)} />;
  }    

   
    return <div className="show-options">
        
        {data.hasStory && <div className="view-story" onClick={()=>setShowStory(true)}>
            <img src={view} alt="view" />
            <span>view</span>
        </div>}

        <div className="File-input">
            <input type="file" id="file" accept="image/*" style={{display:"none"}}
             onChange={(e)=>{
                 if(!e.target.files) return;
                 let selectedFiles=Array.from(e.target.files);

                  setFile((prev) => (prev ? [...prev, ...selectedFiles] : selectedFiles));

                    const previewFiles = selectedFiles.map((f) => URL.createObjectURL(f));
                    setPreviewFile(previewFiles);
             }}
            />

            <label htmlFor="file">
                <img src={storyImage} alt="storyImage" />
                <span>Image</span>
            </label>
        </div>
        <div className="text-input">
               <img src={pen} alt="storyImage" id="text"/>
            <label htmlFor="text">
                <span>Text</span>
            </label>
        </div>

    </div>
}