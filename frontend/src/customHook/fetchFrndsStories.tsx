import { useQuery } from "@tanstack/react-query";
import getStoriesService from "../services/getStoriesService";

export default function useFetchFriendsStories(url:string){
     return useQuery({
        queryKey:["frnds_stories"],
        queryFn:()=>{
          return getStoriesService(url)
        }
     })
}