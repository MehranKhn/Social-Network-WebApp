import axios from "axios";
interface LikeResponse{
    success:boolean,
    message?:string,
    data?:any
}
export default async function addLike(currentUserId:number,postId:number):Promise<LikeResponse>{
        try{
              const res=await axios.post("http://192.168.12.31:3000/api/like/addlike",{
                    likePostId:postId,
                    likeUserId:currentUserId
                },{withCredentials:true})
                return {success:true,data:res.data};
        }
        catch(err:any){
            console.error("Error adding like:", err);
            return {
            success: false,
            message: err.response?.data?.err || "Something went wrong.",
            };
        }
   
}