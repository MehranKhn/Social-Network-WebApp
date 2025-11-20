import "./posts.scss"
import PostCard from "../card/postCard"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import useGetUserLikes from "../../customHook/likesOfUser"
import { useContext } from "react"
import { AuthContext } from "../../contextApi/createContext"

interface post{
    id:number,
    description?:string,
    image?:string,
    userId:number,
    profilePic?:string,
    name:string,
    createdAt:string
}

interface postLikedByUser{
    id:number,
    likePostId:number,
    likeUserId:number
}
export default function Posts(){
    const {currentUserId}=useContext(AuthContext);
    
    const {isLoading,data:posts,isError}=useQuery({
        queryKey:["posts"],
        queryFn:async ()=>{
            
        const res=await axios.get("http://192.168.12.31:3000/api/post/getPosts",{withCredentials:true});
        
        return res.data;
        },
        staleTime:5000,
        refetchInterval:10000,
        refetchOnMount: true,    
        refetchOnWindowFocus: true, 
    })
    if(!currentUserId)return

    //stores the posts liked by the user so that they will display red heart
    const {data:likedPosts}=useGetUserLikes(currentUserId)

    return(

        <div className="posts" style={{minHeight:"100vh",width:"100%",display:"flex",flexDirection:"column",alignItems:"center"}}>
            {
                isError?
                "Something went Wrong":
                isLoading?
                <div className="spinner"></div>:
                posts?.length>0?
                posts.map((post:post)=>{
                         return <PostCard 
                         id={post.id} 
                         user={post.name} 
                         userId={post.userId} 
                         profilePic={post.profilePic}  
                         description={post.description} 
                         images={post.image} 
                         time={post.createdAt}
                         key={post.id}
                         likedByUser={likedPosts?.length>0?likedPosts.some((l:postLikedByUser)=>l.likePostId==post.id):false}></PostCard>
                }):<span className="no-posts">No posts yet</span>

                

            }
        </div>
    )
}
