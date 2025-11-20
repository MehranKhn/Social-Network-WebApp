import type { Request,Response } from "express";
import { db } from "../database/connection.js";
import type { RowDataPacket } from "mysql2";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

 const authController={
     register:async(req:Request,res:Response)=>{
         
         try{
              const{username,email,name,password}=req.body;

              let qCheck="SELECT username,email FROM users WHERE username=? OR email=?";
              const [rows]=await db.query<RowDataPacket[]>(qCheck,[username,email]);
               
              if(rows.length){
                if(rows[0]?.username===username){
                    return res.status(409).json({msg:"Username already exits"});
                }
                else if(rows[0]?.email==email){
                   return res.status(409).json({msg:"Email already exits"});
                }
              }
              const salt=bcrypt.genSaltSync(10);
              const hashedPassword=bcrypt.hashSync(password,salt);

              const qInsert="INSERT INTO users (`username`,`email`,`password`,`name`) VALUES (?)"
              
              db.query(qInsert,[[username,email,hashedPassword,name]]);

              return res.status(200).json("User Created successfully!");

          }
          catch(e){
             res.status(500).json(e);
          }
     },
     
     login:async(req:Request,res:Response)=>{
          const {username}=req.body;
          
          try{

            const qCheck="SELECT * FROM users WHERE username=? OR email=?"
            const[Rows]=await db.query<RowDataPacket[]>(qCheck,[username,username]);
  
            if(!Rows.length){
              return res.status(409).json({msg:"User doesn't exist,Please register!"});
            }
           
            const checkPassowrd=await bcrypt.compare(req.body.password,Rows[0]?.password);
  
            if(!checkPassowrd) return res.status(400).json({msg:"Incorrect password or Username!"});
  
             const token=jwt.sign({id:Rows[0]?.id},process.env.JWT_SECRET!,{expiresIn:'20m'});
             const {password,...others}=Rows[0]!;
  
             res.cookie("token",token,{
               httpOnly:true,
               maxAge:20*60*1000,
               sameSite:"lax",
               secure:false
             }).status(200).json(others);
          }
          catch(e){
            return res.status(500).json({err:e});
          }

     },

     logout:(req:Request,res:Response)=>{
           
           res.clearCookie("token",{
            httpOnly:true,
            secure:false,
            sameSite:"lax",
            path:"/"
           }).status(200).json({msg:"User has been logged out!"});
           console.log(req.cookies.token);
     },
     
     me:(req:Request,res:Response)=>{
         res.status(200).json({
          id:req.user?.id,
          authenticated:true
         })
     }
}

export default authController;