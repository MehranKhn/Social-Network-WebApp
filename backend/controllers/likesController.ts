import type { Request,Response } from "express";
import { db } from "../database/connection.js";
import type { ResultSetHeader, RowDataPacket } from "mysql2";

 const likesController={
    like:async(req:Request,res:Response)=>{
          const q='INSERT INTO likes(likePostId,likeUserId) VALUES(?)'
          const values=[
            req.body.likePostId,
            req.body.likeUserId
          ]
          try{
            await db.query<ResultSetHeader>(q,[values]);
            res.status(200).json({
                msg:"Like added Successfully"
            })
          }
          catch(err){
             res.status(500).json({
                err:err
             })
          }
    },
    removeLike:async(req:Request,res:Response)=>{
         const q='DELETE FROM likes WHERE likePostId=? AND likeUserId=?';

         try{
           await db.query<ResultSetHeader>(q,[req.body.likePostId,req.body.likeUserId]);
            res.status(200).json({
               msg:"Removed the like"
            });
         }
         catch(err){
            res.status(500).json({
               err:err
            })
         }
    },
    getLikesCount:async(req:Request,res:Response)=>{
      const q='SELECT COUNT(*) AS likeCount FROM likes WHERE likes.likePostId=?'

      try{
         const [rows]= await db.query<RowDataPacket[]>(q,[req.params.postId]);
         return res.status(200).json({
            likeCount:rows[0]?.likeCount || 0
         })
      }
      catch(err){
         res.status(500).json({
            err:err
         })
      }
    },
    postLikedByUser:async (req:Request,res:Response)=>{
      const q='SELECT * FROM likes WHERE likeUserId=?';

      try{
         const [rows]=await db.query<RowDataPacket[]>(q,[req.params.userId]);

         if(rows.length==0){
            return res.status(200).json({likedPosts:[]})
         }
         return res.status(200).json({
            likedPosts:rows
         })
      }
      catch(err){
         return res.status(500).json({
            err
         })
      }
    }
}

export default likesController;