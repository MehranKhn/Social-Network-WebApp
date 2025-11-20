import axios from "axios"

export default  async function postStory(url:string,formData:FormData){
    try{
        const res=await axios.post(`http://192.168.12.31:3000/api${url}`,formData,{
                  withCredentials:true,
                  headers:{
                        "Content-Type":"multipart/form-data"
                    }
            });
            return res.data.msg;
    }
    catch(e:any){
       throw new Error("Can't upload Stories")
    }
    
}