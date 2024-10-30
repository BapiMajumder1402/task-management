import { Router } from "express";
import { createTask, getTasks, getTaskById, updateTask, deleteTask } from "../controllers/tasks.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", verifyJWT, createTask);        
router.get("/", verifyJWT, getTasks);        
router.get("/:id", verifyJWT, getTaskById);     
router.put("/:id", verifyJWT, updateTask);    
router.delete("/:id", verifyJWT, deleteTask);     

export default router;
