import express from "express";

import dotenv from "dotenv";

import dbConnect from "./config/dbConnect.js";

dotenv.config();
dbConnect();
const app = express();

// Middleware
app.use(express.json());

// Routes


// Listen port

const PORT = process.env.PORT || 7002;
app.listen(PORT, () => {
  console.log(`server running on the ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Role-based authentication system");
});
