import express from 'express'
import connectDB from './lib/db.js'
import dotenv from "dotenv"
import authRoute from './routes/auth.routes.js'
import messageRoute from './routes/message.routes.js'
import {app,server} from './lib/socket.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

// import path from 'path'

const allowedOrigins=[
     "http://localhost:5173",
     "https://chatapp-mern-3-dtk4.onrender.com"

]

dotenv.config();
const PORT=process.env.PORT || 5002;
// const __dirname=path.resolve();

// app.use(cors({
//    origin:function(origin,callback){
//     if(!origin) return callback(null,true); //allow server to server
//     if(allowedOrigins.includes(origin)){
//         return callback(null,true);
//     }
//      return callback(null,false);
//    },
//    credentials:true 
// }))
// app.options("*", cors());

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"), false);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

// Apply CORS before routes
app.use(cors(corsOptions));

// Handle preflight
app.options(/.*/, cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());


app.use('/api/auth',authRoute);
app.use('/api/message',messageRoute);

// if(process.env.NODE_ENV==="production"){
//     app.use(express.static(path.join(__dirname,"../frontend/dist")));

//     app.get("*",(req,res)=>{
//         res.sendFile(path.join(__dirname,"../fontend","dist","index.html"))
//     })
// }
connectDB();
server.listen(PORT,()=>{
    console.log("Server is running on port:"+PORT);
})