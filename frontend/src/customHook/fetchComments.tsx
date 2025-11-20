import { useQuery } from "@tanstack/react-query";
import axios from "axios";
interface comments{
    id:number,
    description:string,
    profilePic:string,
    name:string,
    createdAt:string,
    commentUserId:number,
    postId:number,
}
function useComments(postCardId:number){
   return useQuery<comments[]>({
       queryKey:[`comments_${postCardId}`],
        queryFn:async()=>{
            const res=await axios.get(`http://192.168.12.31:3000/api/comment/getComments/${postCardId}`,{withCredentials:true});
           return res.data
        }
   })
}

export default useComments