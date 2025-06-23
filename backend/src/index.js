import express from 'express'
import connectDB from './lib/db.js'
import dotenv from "dotenv"
import authRoute from './routes/auth.routes.js'
import messageRoute from './routes/message.routes.js'
import cookieParser from 'cookie-parser'

dotenv.config();
const PORT=process.env.PORT || 5002;

const app=express();
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth',authRoute);
app.use('/api/message',messageRoute);
connectDB();
app.listen(PORT,()=>{
    console.log("Server is running on port:"+PORT);
})