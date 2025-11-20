import { useQuery } from "@tanstack/react-query";
import getStoriesService from "../services/getStoriesService";

export default function useGetUserStories(url:string){
   return useQuery({
    queryKey:["user_stories"],
    queryFn: ()=>{
       return getStoriesService(url);
        
    }
   })
}