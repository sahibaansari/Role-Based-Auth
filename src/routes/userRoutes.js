import express from "express"
import { Router } from "express";
import verifyToken  from "../middlewares/authMiddleware.js";
import authorizedRoles from "../middlewares/roleMiddleware.js";

const router = Router();

// only admin access this route 
router.get("/admin", verifyToken,authorizedRoles("admin"), (req, res) => {
  res.json({ message: "Welcome Admin" });
});
// manager and admin can access this route 

router.get("/manager",verifyToken,authorizedRoles("admin","manager"), (req, res) => {
  res.json({ message: "Welcome manager" });
});

// everyone can access this route 
router.get("/user",verifyToken, authorizedRoles("admin","manager","user"),(req, res) => {
  res.json({ message: "Welcome users" });
});

export default router;