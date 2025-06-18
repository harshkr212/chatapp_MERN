import express from 'express'
import connectDB from './lib/db.js'
import dotenv from "dotenv"
import authRoute from './routes/auth.routes.js'

dotenv.config();
const PORT=process.env.PORT || 5002;

const app=express();
app.use(express.json());
app.use('/api/auth',authRoute);
connectDB();
app.listen(PORT,()=>{
    console.log("Server is running on port:"+PORT);
})