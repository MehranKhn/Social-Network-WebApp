import type { Request,Response } from "express";
import { db } from "../database/connection.js";
import type { RowDataPacket } from "mysql2";

 const userController={
    getUser:async(req:Request,res:Response)=>{
         const userId=req.params.userId;

         try{
            const q='SELECT * FROM users WHERE id=?';
            const [rows]=await db.query<RowDataPacket[]>(q,[userId]);
            if(rows.length==0){
                return res.status(404).json({ error: "User not found" });
            }
            return res.status(200).json(rows[0]);
         }
         catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Database error" });
        }
    },
    
}

export default userController;