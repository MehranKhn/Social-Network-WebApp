import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function useGetUserLikes(userId:number){
    return useQuery({
        queryKey:[`user_${userId}`],
        queryFn:async()=>{
            const res=await axios.get(`http://192.168.12.31:3000/api/like/userLikes/${userId}`,{withCredentials:true});
            return res.data.likedPosts
        },
        staleTime:3000
    })
}