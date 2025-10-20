import type { Request,Response,NextFunction } from "express";
import jwt from "jsonwebtoken";

interface jwtPayload{
    id:number,
    iat:number,
    exp:number
}

function authMiddleware(req:Request,res:Response,next:NextFunction){
    const token=req.cookies.token;
    if(!token){
         return res.status(401).json({
            msg:"Not authenticated!"
        })
     }

    try{
        if(!process.env.JWT_SECRET){
            throw new Error("JWT_SECRET not defined")
        }

        const decoded=jwt.verify(token,process.env.JWT_SECRET!);
        req.user=decoded as jwtPayload;
        next();
    }
    catch(e){
        return res.status(401).json({
            msg:"Invalid or expired token"
        })
    }
}
export default authMiddleware;