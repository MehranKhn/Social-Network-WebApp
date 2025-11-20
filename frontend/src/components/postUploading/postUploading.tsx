import "./postUploading.scss";
import gallery from "../../assets/gallery.png";
import tag from  "../../assets/tag.png";
import location from "../../assets/location.png";
import { ThemeContext } from "../../contextApi/createContext";
import { useContext, useEffect, useRef, useState } from "react";
import {useMutation,useQueryClient } from "@tanstack/react-query";
import success from "../../assets/success.mp3";
import axios from "axios";
import toast from "react-hot-toast";



export default function UploadPost(){

    const [file,setFile]=useState<File[]>([]);
    const [description,setDescription]=useState<string>("");
    const [filePreview,setFilePreview]=useState<string[]>([]);
    const storedUser=localStorage.getItem('user');
    const {theme}=useContext(ThemeContext);
    let user=null;
    if(storedUser){
        try{
            
            user=JSON.parse(storedUser);
        }
        catch(e){
            console.error("Error parsing user data from localStorage:", e);
        }
    }

    function removeFile(i:number){
        setFile(prev => prev.filter((_, index) => i !== index));
        setFilePreview(prev=>prev.filter((_,index)=>index !==i));
      }
    const queryClient=useQueryClient();
    
    const mutation=useMutation({
        mutationFn:async(formData:FormData)=>{
        const res =await axios.post("http://192.168.12.31:3000/api/post/addPost",formData,{
        withCredentials:true,
        headers:{
            "Content-Type":"multipart/form-data"
        }
       });

       return res.data;
    },
    onSuccess:()=>{
        //invalidate and refetch
    const audio=new Audio(success);
    audio.play();
    queryClient.invalidateQueries({queryKey:["posts"]}); 
    setDescription("");
    setFile([]);
    toast.success("Post Uploaded Successfully!",{duration:2000});
    },
    onError: (error: unknown) => {
    if (axios.isAxiosError(error)) {
      // You can access server error message
      
      toast.error(error.response?.data.msg || "Something went wrong!");

    } else {
      toast.error("Something went wrong!");
    }
  },
})

  


    const handleClick=async(e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        if(description.trim()=="" && file.length==0){
            toast.error("Nothing To upload",{
                position:"top-center",
                style:{
                    backgroundColor:"white",
                    color:"black"
                }
            })
            return;
        }
        const formData=new FormData();
        formData.append("description",description);
        if(file){
         formData.append("file",file[file.length-1]);
        }
        
            mutation.mutate(formData);
        
    }

    return <div className={`uploadContainer ${theme=="dark"?" dark":""}`}>

        <div className="input-container">
        {
            user.profilePic?<img src={user.profilePic} alt="PP" /> :
            <div >{user.name[0].toUpperCase()}</div>
        }
        <textarea 
        className="textArea"
        placeholder={`what's on your mind ${user?.name}?`}
        rows={4}
        id="post"
        value={description}
        onChange={e=>setDescription(e.target.value)}></textarea>

        {file &&
        
        filePreview.map((f,i)=>{
            const FILE=file[i];
            if (!FILE) return;

            return FILE.type.startsWith("video/")?
            <div style={{position:"relative"}} className="video-preview" key={i}>
                <video  src={f}></video>
                <button style={{position:"absolute",bottom:0,right:0}}>X</button>
            </div>
            :
            <div style={{position:"relative"}} className="img-preview" key={i}>
                <img key={i} style={{width:"100%",borderRadius:"2px"}} src={f}></img>
                <button style={{position:"absolute",padding:"2px",backgroundColor:"red",color:"white",border:"none",width:"20px",height:"20px",fontSize:"15px"}} onClick={()=>removeFile(i)}>X</button>
            </div>

        })

        }

        </div>

    <div className="icons-share">

       {/* bottom of the post uploader */}
        <div className="left">
           
        <input 
        type="file" 
        id="file" 
        style={{display:"none"}}
        accept="image/*,video/*"
        onChange={e=>{
            if (!e.target.files) return;
            let selectedFiles=Array.from(e.target.files);
            
            setFile(prev=>{
                const updatedFiles=prev?[...prev,...selectedFiles]:selectedFiles;
                const updatedPreviews=updatedFiles.map((f)=>(URL.createObjectURL(f)));

                setFilePreview(updatedPreviews);

                return updatedFiles;
            })
        }
     }/>  


        <label htmlFor="file">
         <div className="item" style={{display:"flex",justifyContent:"center",alignItems:"center",gap:"5px"}}>
                <img src={gallery} alt="gallery" width={"28px"} height={"28px"} />  
                <span style={{color:"gray"}}>Add Image</span> 
        </div>
        </label>                

                    
          <div className="item" style={{display:"flex",justifyContent:"center",alignItems:"center",gap:"5px"}}>                  
            <img src={location} alt="location" width={"28px"} height={"28px"}/>
            <span style={{color:"gray"}}>Add Place</span>  
        </div>
        <div className="item" style={{display:"flex",justifyContent:"center",alignItems:"center",gap:"5px"}}>              
         <img src={tag} alt="tag" width={"28px"} height={"28px"}/>           
         <span style={{color:"gray"}} >Tag Friends</span>  
        </div>

        </div>


        <div className="share-btn">
        <button onClick={handleClick} disabled={mutation.isPending}>
            {mutation.isPending?<span className="spinner"></span>:"Share"}
        </button>
        </div>
    </div>

    </div>
}