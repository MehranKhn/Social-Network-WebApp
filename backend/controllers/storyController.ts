import { db } from "../database/connection.js"
import type { Request,Response } from "express";
import type {ResultSetHeader, RowDataPacket } from "mysql2";
import moment from "moment";
const storyController={
  getStories:async(req:Request,res:Response)=>{
     const q='SELECT s.*,u.id AS userId,u.profilePic,u.name FROM stories AS s JOIN users AS u ON(s.storyUserId=u.id) WHERE s.storyUserId IN (SELECT followedUserId FROM relationships WHERE followerUserId=?)'

     try{
       const [rows]=await db.query<RowDataPacket[]>(q,[req.user?.id]);

        if(rows.length==0){
          return res.status(200).json({
            stories:[]
          });
        }
        return res.status(200).json({
          stories:rows
        })
     }
     catch(err){
      return res.status(500).json({
        err:err
      })
     }
  },
  postStory:async (req:Request,res:Response)=>{
    const q='INSERT INTO stories(storyImage,storyText,createdAt,expiresAt,storyUserId) VALUES ?'
    const files = req.files as Express.Multer.File[];

    try{
      
      const values = files.map(file => [
        file.filename,
        req.body.description || null,
        moment().format("YYYY-MM-DD HH:mm:ss"),
        moment().add(24, "hours").format("YYYY-MM-DD HH:mm:ss"),
        req.user?.id
      ]);
      await db.query<ResultSetHeader>(q,[values]);
        return res.status(200).json({
         msg:"Story Uploaded Successfully!"
        });
    }
    catch(e){
      return res.status(500).json({
        err:e
      })
    }
  
  },
  myStory:async(req:Request,res:Response)=>{
    const q='SELECT s.storyImage,s.storyText,s.createdAt,u.name,u.profilePic FROM stories AS s JOIN users AS u ON(s.storyUserId=u.id) WHERE storyUserId=? AND expiresAt>Now()';

    try{
      const [rows]=await db.query<RowDataPacket[]>(q,[req.user?.id]);
      if(rows.length==0){
        return res.status(200).json({
          hasStory:false
        })
      }
      return res.status(200).json({
        hasStory:true,
        story:rows
      })
  }
  catch(e){
    return res.status(500).json({
      err:e
    })
  }
}
}
export default storyController