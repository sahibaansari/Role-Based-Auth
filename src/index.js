import express from "express";
import dotenv from "dotenv";
import dbConnect from "./config/dbConnect.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js"

dotenv.config();
const app = express();
dbConnect();

// Middleware
app.use(express.json());

// Routes 
app.use("/api/auth", authRoutes);
app.use("/api/users",userRoutes);

// start the server 
const PORT = process.env.PORT || 7002;
app.listen(PORT,()=>{
  console.log(`server is running on ${PORT}`);

})