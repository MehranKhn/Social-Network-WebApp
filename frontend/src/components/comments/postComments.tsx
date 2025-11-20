import { useMutation,useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../contextApi/createContext";
import { useContext } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

function PostComments({postCardId}:{postCardId:number}){
  const {currentUserId}=useContext(AuthContext);
  const [comment,setComment]=useState<string>("");
  // react query to insert the comment
  const queryClient=useQueryClient();
   console.log(currentUserId)
   console.log(postCardId)
    const mutation=useMutation({
        mutationFn:async(postCardId:number)=>{
            await axios.post("http://192.168.12.31:3000/api/comment/postComment",{
               postId:postCardId,
               commentUserId:currentUserId,
               description:comment,
            },{withCredentials:true});
        },
        onSuccess:(_,postCardId)=>{
             toast.success("Comment posted Successfully",{
                duration:1500,
                position:"top-center",
                style:{
                  backgroundColor:"white",
                  color:"black"
                }
             });
             queryClient.invalidateQueries({queryKey:[`comments_${postCardId}`]});

             setComment("");
        },
        onError:(error:unknown)=>{
           if (axios.isAxiosError(error)) {
      // You can access server error message
      
            toast.error(error.response?.data.msg || "Something went wrong!");

            } else {
            toast.error("Something went wrong!");
            }
        }
            
    });

    function handlePost(){
        if(comment.trim()==""){
            toast.error("Enter a valid comment!");
        }
        mutation.mutate(postCardId)
    }

    const user=localStorage.getItem('user');
    let parsedUser;
        if(user){
            parsedUser=JSON.parse(user);
        }

    return <div className="write">
                <Link to={`/profile/${currentUserId}`} style={{textDecoration:"none"}}>
                           {parsedUser.profilePic ? <img src={parsedUser.profilePic} alt="PP"/>:
                           <div style={{width:"40px",height:"42px",backgroundColor:"#ffebe7ff",borderRadius:"50%",
                            border:"none",fontWeight:"bold",fontSize:"20px",display:"flex",
                            justifyContent:"center",alignItems:"center"
                            
                           }}>{ parsedUser.name[0].toUpperCase()}</div>}
                  </Link>
                <input type="text" value={comment} placeholder="Write a Comment" onChange={(e)=>setComment(e.target.value)}/>

                <button onClick={handlePost}>Post</button>
            </div>
         
    
}
export default PostComments;