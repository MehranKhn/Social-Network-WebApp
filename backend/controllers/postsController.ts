import type { Request,Response } from "express";
import type { RowDataPacket } from "mysql2";
import { db } from "../database/connection.js";

 const postsController={
    getPosts:async(req:Request,res:Response)=>{
       const q=`SELECT p.*,u.id AS userId,name,profilePic FROM posts AS p
       JOIN users AS u
       ON (p.userId=u.id)
       LEFT JOIN relationships AS r 
       ON(r.followedUserId=u.id) WHERE r.FollowerUserId=? OR p.userId=?`
       
       try{

           const[rows]=await db.query<RowDataPacket[]>(q,[req.user?.id,req.user?.id]);
    
           if(!rows[0]){
             return res.status(200).json([])
           }
           
           return res.status(200).json(rows)
       }
        catch(e){
            console.log(e)
            return res.status(500).json({
                error:"Database error"
            });
        }
    }
}

export default postsController;