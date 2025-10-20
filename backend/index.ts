import express from "express";
import cors  from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import postRouter from "./routes/posts.js";
const app = express();
// Apply cookie-parser BEFORE cors
app.use(cookieParser());

const allowedOrigins=[
  "http://localhost:5173",
  "http://192.168.135.31:5173"
]
const corsOptions = {
  origin: function (origin:string|undefined,callback:(err:Error|null,allow?:boolean)=>void){
     if(!origin) return callback(null,true);

     if(allowedOrigins.includes(origin)){
      return callback(null,true);
     }
     else{
      return callback(new Error("Not allowed by cors"))
     }
  },
  credentials: true, // ✅ Fixed typo: was "Credential"
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};


app.use(cors(corsOptions));
app.use(express.json());

// ✅ Your routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use('/api/posts',postRouter)
  app.listen(3000, () => {
    console.log("Server is Up and running on 3000");
  });




