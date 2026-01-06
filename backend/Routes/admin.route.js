import express from "express";
import {admin} from "../controllers/admin.controller.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();


router.post("/admin", admin);

export default router;