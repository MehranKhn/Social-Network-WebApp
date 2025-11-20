import type { Request,Response } from "express";
import { db } from "../database/connection.js";
import type { ResultSetHeader, RowDataPacket } from "mysql2";
import moment from "moment";
 const commentsController={
    postComment:async(req:Request,res:Response)=>{
       const q='INSERT INTO comments(description,createdAt,commentUserId,postId)VALUES(?)'

       try{
        const values=[
            req.body.description,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            req.body.commentUserId,
            req.body.postId
         ]
          await db.query<ResultSetHeader>(q,[values]);
          res.status(200).json({
            msg:"Post created Successfully"
          })
       }
       catch(err){
         console.log(err);
         res.status(500).json({
            error:err
         })
       }
    },
    getComment:async(req:Request,res:Response)=>{
        const q='SELECT c.*,u.name,u.id,u.profilePic FROM comments c  JOIN users u ON (c.commentUserId=u.id)  WHERE c.postId=? ORDER BY c.createdAt DESC'
        try{
            const [rows]=await db.query<RowDataPacket[]>(q,[req.params.id]);
            if(rows.length==0){
                return res.status(200).json([])
            }
            return res.status(200).json(rows);
        }
        catch(err){
            console.log(err);
            return res.status(500).json({
                error:"Database Error"
            })
        }
    }
}

export default commentsController;