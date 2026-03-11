import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import connectDb from './config/db.js';
import cookieParser from 'cookie-parser';
import {router as authRoutes} from './routes/user.routes.js'
import cors from 'cors'
const app = express()

connectDb();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes)

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})