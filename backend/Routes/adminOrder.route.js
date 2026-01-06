import express from "express";
import { adminorderget,updateOrderStatus } from "../controllers/adminOrder.controller.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

router.use(adminAuth);

router.get("/adminorderget", adminorderget);

router.put("/updateOrderStatus/:orderId",updateOrderStatus);

export default router;