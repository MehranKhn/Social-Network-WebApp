import axios from "axios"

interface RemoveLikeResponse{
    success:boolean,
    message?:string,
    data?:any
}

export default async function removeLike(currentUserId:number,postId:number):Promise<RemoveLikeResponse>{

   try{
    const res=await axios.post("http://192.168.12.31:3000/api/like/removelike",{
                    likePostId:postId,
                    likeUserId:currentUserId
                },{withCredentials:true})
                return {success:true,data:res.data};
        }
        catch(err:any){
            console.log("Can't remove like: ",err);

            return{
                success:false,
                message:err?.response.data.err||"Something went wrong"
            }
        }
   }
