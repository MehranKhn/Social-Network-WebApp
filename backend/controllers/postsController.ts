import type { Request,Response } from "express";
import type {ResultSetHeader, RowDataPacket } from "mysql2";
import { db } from "../database/connection.js";
import moment from "moment";

 const postsController={
    getPosts:async(req:Request,res:Response)=>{
       const q=`SELECT DISTINCT p.*,u.id AS userId,name,profilePic FROM posts AS p
       JOIN users AS u
       ON (p.userId=u.id)
       LEFT JOIN relationships AS r 
       ON(r.followedUserId=u.id) WHERE r.FollowerUserId=? OR p.userId=? ORDER BY p.createdAt DESC`
       
       try{

           const[rows]=await db.query<RowDataPacket[]>(q,[req.user?.id,req.user?.id]);
           if(rows.length==0){
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
    },
    getPostsOfUser:async(req:Request,res:Response)=>{
       const userId=req.params.id;

       try{

        const q = `
                SELECT 
                p.*, 
                u.id AS userId, 
                u.name, 
                u.coverPic, 
                u.profilePic, 
                u.city, 
                u.website
                FROM users AS u
                LEFT JOIN posts AS p ON p.userId = u.id
                WHERE u.id = ?
                ORDER BY p.createdAt DESC;
                `;
        const [rows] = await db.query<RowDataPacket[]>(q, [userId,userId]);

        if(rows.length==0){
            return res.status(200).json([]);
        }

        return res.status(200).json(rows);

       }
       catch(error){
           return res.status(500).json({
               msg:"database Error"
           })
       }
    },
    addPost:async(req:Request,res:Response)=>{
          const q="INSERT INTO posts (`description`,`image`,`createdAt`,`userId`) VALUES(?)"
          
          try{
            const values=[
                req.body.description,
                req.file?req.file.filename:null,
                moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                req.user?.id
            ]
            await db.query<ResultSetHeader>(q,[values])
            return res.status(200).json({
                msg:"Post has been created"
            })
          }
          catch(err){
            return res.status(500).json(err);
          }
    },

    deletePost:async(req:Request,res:Response)=>{
        const q='DELETE FROM posts WHERE id=?'

        try{
            await db.query<ResultSetHeader>(q,[req.body.id]);
            
            res.status(200).json({
                msg:"post deleted successfully"
            })
        }
        catch(err){
            return res.status(500).json(err);
        }

    }
}

export default postsController;