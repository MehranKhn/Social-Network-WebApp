import { useEffect, useState, type SetStateAction } from "react"
import "./addStory.scss"
import plus from "../../../assets/plus.png"
import post from "../../../assets/post.png"
import usePostStories from "../../../customHook/postStories"
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface addStoryProps{
   previewFiles:string[],
   setPreviewFiles:React.Dispatch<SetStateAction<string[]>>,
   setFiles:React.Dispatch<SetStateAction<File[]>>,
   files:File[]
}

export default function AddStory({previewFiles,setPreviewFiles,setFiles,files}:addStoryProps){
    
    const navigate=useNavigate();
    const[currentPreview,setCurrentPreview]=useState(0);
    const mutation=usePostStories("/story/upload-story");

    const handleClick=async(e:React.MouseEvent<HTMLDivElement>)=>{
        e.preventDefault();
        
        const formData=new FormData();
        
        files.forEach(file=>formData.append("files",file));
         mutation.mutate(formData,{
            onSuccess:()=>{

                setFiles([]);
                setPreviewFiles([]);
                navigate("/");
                toast.success("Story Uploaded Successfully!",{
                    position:"top-center"
                });
            },
            onError:(err)=>{
                 console.log("uploaded file: ",err);
                 toast.error("Can't upload story!",{
                    position:"top-center"
                 });
            }
         })
        }
        


   function handleCancelPreview(i:number){
      const filteredPreview=previewFiles.filter((_,index)=>index!=i);
      setPreviewFiles(filteredPreview);


      setCurrentPreview((prev) => {
        if (i === prev && filteredPreview.length > 0) {
            // if we deleted the current one, show the next one or the previous if at the end
            return Math.min(prev, filteredPreview.length - 1);
        } else if (i < prev) {
            // if we deleted an earlier one, shift index left
            return prev - 1;
        }
        return prev;
});

   }

   useEffect(()=>{
    const html = document.documentElement; 
        
            document.body.style.overflow="hidden"
            html.style.overflow = "hidden";

            return ()=>{
                document.body.style.overflow="auto"
                html.style.overflow = "auto";
            }
        
   },[])

    
    return <div className="Add-story">
        <button onClick={()=>setPreviewFiles([])} className="close-btn">X</button>
         <div className="preview">
               <img src={previewFiles[currentPreview]} alt="" />
         </div>

         <div className="add-preview">
               
                {
                    previewFiles.map((f,i)=>{
                        return <div     className="preview-list" key={f}>
                           <img src={f} alt="story-preview" onClick={()=>setCurrentPreview(i)}/>
                           <span onClick={()=>handleCancelPreview(i)}>X</span>
                        </div>
                    })
                }
              


               <input type="file" accept="image/*" id="moreFiles" style={{display:"none"}}
                onChange={(e)=>{
                    if(!e.target.files) return;
                    let selectedFiles=Array.from(e.target.files);
                    setFiles(prev=>prev?[...prev,...selectedFiles]:selectedFiles);
                    const previewFiles = selectedFiles.map((f) => URL.createObjectURL(f));

                    setPreviewFiles((prev:string[])=>prev?[...prev,...previewFiles]:previewFiles);
                }}
               />

               <label htmlFor="moreFiles">
                  <img className="add-more" src={plus} alt="add-more" />
               </label>
               
         </div>

         <div className="post-story" onClick={handleClick}>
            <div className="post-text">
              <span>Post</span>
            </div>
            <div className="post-icon">
                <img src={post} alt="post" />
            </div>
         </div>
    </div>
}