import { AuthContext } from "../../contextApi/createContext";
import { useContext } from "react";
import dlt from "../../assets/delete (1).png"
import share from "../../assets/share.png";
import "./menu.scss";
import { useMutation,useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import deletion from "../../assets/deletion.mp3"
export default function Menu({id,postId}:{id:number,postId:number}){

  const queryClient=useQueryClient();

  const mutation=useMutation({
      mutationFn:async()=>{
        await axios.post("http://192.168.12.31:3000/api/post/deletePost",{id:postId},{
          withCredentials:true
        })
      },

      onSuccess:()=>{
        const audio=new Audio(deletion);
        toast.success("Post Deleted Successfully");
        audio.play();
        queryClient.invalidateQueries({queryKey:["posts"]});
         
      }
  })

    function deletePost(){
       mutation.mutate()
    }

    const {currentUserId}=useContext(AuthContext);
    console.log(currentUserId)
    console.log(id);
    return <div className="more">
        <div className="options">


          <div className="option">
              <img src={share} alt="share" />
              <span>Share</span>
          </div>
          {currentUserId==id && <div className="option" onClick={deletePost}>
           <img src={dlt} alt="delete" />
           <span>Delete</span>
          </div>}

        </div>
    </div>
}
