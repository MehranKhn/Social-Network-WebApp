import axios from "axios";

export default async function (url:string) {
    try{
        const res=await axios.get(`http://192.168.12.31:3000/api${url}`,{
            withCredentials:true
        });
        return res.data;
    }
    catch(e:any){
        throw new Error("Error",e.data.response);
    }
}
