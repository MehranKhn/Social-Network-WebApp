import { useMutation } from "@tanstack/react-query"
import postStory from "../services/postStories"

export default function usePostStories(url:string){
    return useMutation({
        mutationFn:(formData:FormData)=>{
           return postStory(url,formData)
        }
    })
}