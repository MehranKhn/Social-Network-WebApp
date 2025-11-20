import axios from "axios";
import { useQuery } from "@tanstack/react-query";


interface LikeCountResponse{
    likeCount:number
}
export default function useGetLikes(postId:number){
     return useQuery<LikeCountResponse>({
        queryKey:[`likes_${postId}`],
        queryFn:async()=>{
            try{
                 const res=await axios.get(`http://192.168.12.31:3000/api/like/getLike/${postId}`,{withCredentials:true});

                 return res.data
            }
            catch(err:any){
               return err?.response.data.err
            }
        },
        staleTime:6000,
        refetchInterval:10000,
        refetchOnMount: true,    
        refetchOnWindowFocus: true,
     })
}
            