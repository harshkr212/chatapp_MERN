import express from 'express'
import connectDB from './lib/db.js'
import dotenv from "dotenv"
import authRoute from './routes/auth.routes.js'
import messageRoute from './routes/message.routes.js'
import {app,server} from './lib/socket.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

dotenv.config();
const PORT=process.env.PORT || 5002;


app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use(cors({
   origin:"http://localhost:5173",
   credentials:true 
}))

app.use('/api/auth',authRoute);
app.use('/api/message',messageRoute);
connectDB();
server.listen(PORT,()=>{
    console.log("Server is running on port:"+PORT);
})