import express from "express";
import cors  from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import postRouter from "./routes/posts.js";
import commentRouter from "./routes/comments.js"
import likeRouter from "./routes/likes.js"
import path from "path";
import storyRouter from "./routes/story.js"

const app = express();

app.use(cookieParser());
const allowedOrigins=[
  "http://localhost:5173",
  'http://127.0.0.1:5173',          // IPv4 local frontend
  'http://[::1]:5173',
  "http://192.168.26.31:5173",
  "http://192.168.12.31:5173",
]
const corsOptions = {
  origin:function (origin:string|undefined,callback:(err:Error|null,allow?:boolean)=>void){
       if(!origin) return callback(null,true);
    
       if(allowedOrigins.includes(origin)){
          return callback(null,true);
         }
         else{
            console.error(`CORS BLOCKED: Request origin was ${origin}`)
            return callback(new Error("Not allowed by cors"))
           }
           },
    credentials: true, // ✅ Fixed typo: was "Credential"
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};


app.use(cors(corsOptions));
app.use(express.json());

//server the static images
app.use("/uploads",express.static(path.join(process.cwd(),'uploads')));

// ✅ Your routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use('/api/post',postRouter);
app.use('/api/comment',commentRouter);
app.use('/api/like',likeRouter);
app.use('/api/story',storyRouter);

  app.listen(3000,'0.0.0.0',() => {
    console.log("Server is Up and running on 3000");
  });




